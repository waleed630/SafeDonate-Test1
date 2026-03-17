// socket/socketHandler.js
import Message from '../models/Message.js';
import Notification from '../models/Notification.js';
import Campaign from '../models/Campaign.js';

const initializeSocket = (io) => {
  const onlineUsers = new Map(); // userId → socketId

  io.on("connection", (socket) => {
    console.log(`🔌 User connected: ${socket.id}`);

    // ==================== ONLINE USERS ====================
    socket.on("registerOnline", ({ userId }) => {
      onlineUsers.set(userId, socket.id);
      io.emit("onlineUsersUpdate", Array.from(onlineUsers.keys()));
    });

    // ==================== CHAT (Existing) ====================
    socket.on("joinChat", ({ userId, otherUserId }) => {
      const room = [userId, otherUserId].sort().join("-");
      socket.join(room);
      socket.currentRoom = room;
    });

    socket.on("sendMessage", async (data) => {
      const { from, to, message, campaignId } = data;
      const room = [from, to].sort().join("-");

      const newMessage = new Message({ from, to, message, campaignId, readBy: [from] });
      await newMessage.save();

      io.to(room).emit("receiveMessage", newMessage);
    });

    socket.on("typing", ({ from, to }) => {
      const room = [from, to].sort().join("-");
      socket.to(room).emit("userTyping", { from });
    });

    // ==================== REAL-TIME DONATION UPDATES ====================
    socket.on("newDonation", async (data) => {
      const { campaignId, amount, donorId } = data;

      const campaign = await Campaign.findById(campaignId);
      if (campaign) {
        campaign.raisedAmount += amount;
        campaign.donorCount += 1;
        await campaign.save();

        // Broadcast instant progress update to everyone
        io.emit("progressUpdate", {
          campaignId,
          raisedAmount: campaign.raisedAmount,
          progress: campaign.progress,
          donorCount: campaign.donorCount
        });

        // Send live notification to fundraiser
        const notification = new Notification({
          user: campaign.fundraiser,
          type: 'donation',
          title: 'New Donation Received!',
          message: `Someone donated $${amount}`,
          campaign: campaignId,
        });
        await notification.save();

        io.to(onlineUsers.get(campaign.fundraiser.toString())).emit("newNotification", notification);
      }
    });

    // ==================== DISCONNECT ====================
    socket.on("disconnect", () => {
      for (let [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          io.emit("onlineUsersUpdate", Array.from(onlineUsers.keys()));
          break;
        }
      }
    });
  });
};

export default initializeSocket;