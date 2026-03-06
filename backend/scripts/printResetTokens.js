// scripts/debug-password-reset.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

async function debugResetTokens() {
    console.log("🔍 SafeDonate - Password Reset Token Debugger\n");

    if (!process.env.MONGO_URI) {
        console.error("❌ MONGO_URI is not set in .env file!");
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB\n");

        const users = await User.find({
            passwordResetToken: { $exists: true, $ne: null }
        }).select("email passwordResetToken passwordResetExpires createdAt");

        if (users.length === 0) {
            console.log("✅ No users have active password reset tokens.");
        } else {
            console.log(`🔎 Found ${users.length} user(s) with reset token:\n`);

            users.forEach((user, index) => {
                console.log(`User ${index + 1}:`);
                console.log(`   Email              : ${user.email}`);
                console.log(`   Reset Token        : ${user.passwordResetToken}`);
                console.log(`   Expires At         : ${user.passwordResetExpires}`);
                console.log(`   Token Age          : ${Math.floor((Date.now() - new Date(user.passwordResetExpires).getTime()) / 1000 / 60)} minutes ago`);
                console.log("   ────────────────────────────────");
            });

            // Optional: Clear all tokens (uncomment if needed)
            // console.log("\n🧹 Clearing all reset tokens...");
            // await User.updateMany({}, { $unset: { passwordResetToken: 1, passwordResetExpires: 1 } });
            // console.log("✅ All reset tokens cleared.");
        }
    } catch (err) {
        console.error("❌ Error:", err.message);
    } finally {
        await mongoose.disconnect();
        console.log("\n🔌 Disconnected from MongoDB. Script finished.");
        process.exit(0);
    }
}

debugResetTokens();