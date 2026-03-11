// controllers/webhookController.js
import stripe from '../config/stripe.js';
import Donation from '../models/Donation.js';
import Campaign from '../models/Campaign.js';
import logger from '../utils/logger.js';

export const stripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        logger.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const donation = await Donation.findOne({ stripeSessionId: session.id });

        if (donation) {
            donation.status = 'completed';
            await donation.save();

            const campaign = await Campaign.findById(donation.campaign);
            if (campaign) {
                campaign.raisedAmount += donation.amount;
                campaign.donorCount += 1;
                await campaign.save();
            }

            // Send confirmation email (implement SMTP later)
            logger.info(`Donation completed: ID ${donation._id}, amount ${donation.amount}`);
        }
    }

    res.json({ received: true });
};