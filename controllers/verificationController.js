// controllers/verificationController.js
import Campaign from '../models/Campaign.js';
import logger from '../utils/logger.js';
import axios from 'axios';

const HUGGINGFACE_TOKEN = process.env.HUGGINGFACE_TOKEN;

// AI Fraud Detection using Open-Source Hugging Face Model
const getAIFraudScore = async (description) => {
  if (!HUGGINGFACE_TOKEN) return 0;

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
      {
        inputs: description,
        parameters: {
          candidate_labels: ["legitimate campaign", "suspicious scam", "fake story", "urgent fraud"]
        }
      },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_TOKEN}`,
        }
      }
    );

    const scores = response.data[0];
    const scamScore = scores.find(s => 
      s.label.includes("scam") || s.label.includes("fraud")
    )?.score || 0;

    return Math.round(scamScore * 100); // 0-100 scale
  } catch (err) {
    logger.warn("HuggingFace AI failed, using rule-based only");
    return 0;
  }
};

// Combined Fraud Score (Rule-based + AI)
const calculateFraudScore = async (campaign) => {
  let score = 0;

  // Rule 1: Very short description
  if (campaign.description.length < 150) score += 30;

  // Rule 2: Unrealistically high goal with no updates
  if (campaign.goalAmount > 50000 && campaign.updates.length === 0) score += 25;

  // Rule 3: No images
  if (campaign.images.length === 0) score += 20;

  // Rule 4: Suspicious keywords
  const suspiciousWords = ['urgent', 'help me', 'god bless', 'emergency', 'please help'];
  const descLower = campaign.description.toLowerCase();
  if (suspiciousWords.some(word => descLower.includes(word))) score += 15;

  // AI Score (Open Source Model)
  const aiScore = await getAIFraudScore(campaign.description);
  score += aiScore;

  return Math.min(100, score);
};

// Admin: Verify Campaign
const verifyCampaign = async (req, res) => {
  try {
    const { action, rejectionReason } = req.body;
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) return res.status(404).json({ success: false, message: "Campaign not found" });

    if (action === "approve") {
      const fraudScore = await calculateFraudScore(campaign);
      campaign.verified = true;
      campaign.fraudScore = fraudScore;
      campaign.verifiedBy = req.user._id;
      campaign.verifiedAt = new Date();
      campaign.rejectionReason = undefined;
    } 
    else if (action === "reject") {
      campaign.verified = false;
      campaign.rejectionReason = rejectionReason || "Not approved by admin";
    } 
    else {
      return res.status(400).json({ success: false, message: "Invalid action. Use 'approve' or 'reject'" });
    }

    await campaign.save();

    res.json({
      success: true,
      message: action === "approve" ? "Campaign approved and verified" : "Campaign rejected",
      campaign
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ==================== GET PENDING CAMPAIGNS (FIXED) ====================
 const getPendingCampaigns = async (req, res) => {
  try {
    // This is the cleanest and most reliable query
    const campaigns = await Campaign.find({ 
      verified: { $ne: true }     // ← This excludes all campaigns where verified = true
    })
      .populate('fundraiser', 'username email')
      .sort({ createdAt: -1 });

    res.json({ 
      success: true, 
      count: campaigns.length, 
      campaigns 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export { verifyCampaign, getPendingCampaigns,calculateFraudScore,getAIFraudScore };