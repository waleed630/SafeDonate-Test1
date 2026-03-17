// controllers/campaignController.js
import Campaign from '../models/Campaign.js';
import logger from '../utils/logger.js';

export const createCampaign = async (req, res) => {
    try {
        const {
            title, category, tags, description, goalAmount, endDate
        } = req.body ?? {};

        if (!req.body) {
            return res.status(400).json({ success: false, message: 'Missing request body' });
        }

        if (req.user.role !== 'fundraiser') {
            return res.status(403).json({ success: false, message: 'Only fundraisers can create campaigns' });
        }

        const images = req.files?.map(f => f.path) || [];

        const campaign = new Campaign({
            title,
            category,
            tags: tags ? tags.split(',').map(t => t.trim()) : [],
            description,
            images,
            goalAmount: Number(goalAmount),
            endDate: new Date(endDate),
            fundraiser: req.user._id,
        });

        await campaign.save();

        res.status(201).json({
            success: true,
            message: 'Campaign created successfully',
            campaign
        });
    } catch (err) {
        logger.error(err);
        res.status(400).json({ success: false, message: err.message });
    }
};

export const getCampaigns = async (req, res) => {
  try {
    const { 
      search,           // keyword search
      category, 
      location, 
      minGoal, 
      maxGoal, 
      minProgress,      // e.g. 50 for 50%+
      sort              // "newest", "oldest", "popular", "progress"
    } = req.query;

    const query = { verified: true };   // Only show verified campaigns

    // 1. Keyword Search (title + description)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // 2. Filter by Category
    if (category) query.category = category;

    // 3. Filter by Location
    if (location) query.location = { $regex: location, $options: 'i' };

    // 4. Filter by Target Amount (Goal)
    if (minGoal) query.goalAmount = { ...query.goalAmount, $gte: Number(minGoal) };
    if (maxGoal) query.goalAmount = { ...query.goalAmount, $lte: Number(maxGoal) };

    // Build query
    let campaignsQuery = Campaign.find(query)
      .populate('fundraiser', 'username email')
      .select('-__v');

    // 5. Sort Options
    switch (sort) {
      case 'newest':
        campaignsQuery = campaignsQuery.sort({ createdAt: -1 });
        break;
      case 'oldest':
        campaignsQuery = campaignsQuery.sort({ createdAt: 1 });
        break;
      case 'popular':
        campaignsQuery = campaignsQuery.sort({ donorCount: -1 });
        break;
      case 'progress':
        campaignsQuery = campaignsQuery.sort({ raisedAmount: -1 }); // Higher progress first
        break;
      default:
        campaignsQuery = campaignsQuery.sort({ createdAt: -1 });
    }

    const campaigns = await campaignsQuery;

    // 6. Filter by Progress (post-query because it's a virtual field)
    let filteredCampaigns = campaigns;
    if (minProgress) {
      filteredCampaigns = campaigns.filter(c => c.progress >= Number(minProgress));
    }

    res.json({
      success: true,
      count: filteredCampaigns.length,
      campaigns: filteredCampaigns
    });
  } catch (error) {
    logger.error("Advanced search error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const getCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id)
            .populate('fundraiser', 'username email');
        if (!campaign) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, campaign });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const updateCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) return res.status(404).json({ success: false, message: 'Not found' });

        if (campaign.fundraiser.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        Object.assign(campaign, req.body);
        if (req.files?.length) {
            campaign.images = req.files.map(f => f.path);
        }

        await campaign.save();
        res.json({ success: true, campaign });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

export const deleteCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) return res.status(404).json({ success: false, message: 'Not found' });

        if (campaign.fundraiser.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        await campaign.deleteOne();
        res.json({ success: true, message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const addUpdate = async (req, res) => {
    try {
        const { title, content } = req.body;
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) return res.status(404).json({ success: false, message: 'Not found' });

        if (campaign.fundraiser.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        campaign.updates.push({ title, content });
        await campaign.save();

        res.json({ success: true, campaign });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};