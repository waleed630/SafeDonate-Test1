// controllers/notificationController.js
import Notification from '../models/Notification.js';

const  getUserNotifications = async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id })
    .populate('campaign', 'title')
    .sort({ createdAt: -1 });

  res.json({ success: true, notifications });
};

 const markAsRead = async (req, res) => {
  await Notification.updateMany(
    { user: req.user._id, _id: { $in: req.body.notificationIds } },
    { read: true }
  );
  res.json({ success: true });
};
export  { getUserNotifications, markAsRead };