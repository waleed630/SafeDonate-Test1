// server.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import passport from "passport";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import campaignRoutes from './routes/campaignRoutes.js';

import logger from "./config/logger.js";
import { morganMiddleware } from "./config/logger.js";
import errorHandler from "./middleware/errorHandler.js";
//import errorHander from "./middlewares/errorHandler.js"; 
import User from "./models/User.js";                    // ← For admin seeding

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.join(__dirname, "../.env") });

// Load Passport Google Strategy
import "./config/passport.js";

const app = express();

// ====================== CORS ======================
const allowedOrigins = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:3000",
    // Vite / modern frontend dev server
    "http://localhost:5173",
    "http://127.0.0.1:5173",
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

// ====================== SECURITY ======================
app.use(helmet({ crossOriginEmbedderPolicy: false, contentSecurityPolicy: false }));
app.use(cookieParser());
app.use((req, res, next) => {
    req.cookies = req.cookies || {};
    next();
});
app.use(express.json());
app.use(morganMiddleware);

// ====================== PASSPORT ======================
app.use(passport.initialize());

// ====================== ROUTES (Phase 1 - Only Auth) ======================
app.use("/api/auth", authRoutes);
app.use('/api/campaigns', campaignRoutes);

// ====================== HEALTH CHECK ======================
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "SafeDonate API is running! ✅",
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV || "development",
    });
});

// ====================== ERROR HANDLING ======================
app.use(errorHandler);

// ====================== START SERVER + ADMIN SEEDING ONLY ======================
const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
        logger.info("MongoDB connected successfully");

        // ====================== DEFAULT ADMIN SEEDING ONLY ======================
        const ADMIN_EMAIL = "m.waleedbinlatif@gmail.com";
        const ADMIN_PASS = "Admin@SafeDonate2025";

        const adminExists = await User.findOne({ email: ADMIN_EMAIL });

        if (!adminExists) {
            const admin = new User({
                username: "superadmin",
                name: "Muhammad Waleed Bin Latif",
                email: ADMIN_EMAIL,
                password: ADMIN_PASS,
                role: "admin",
                isVerified: true,
            });
            await admin.save();

            console.log("✅ DEFAULT ADMIN CREATED (Only Admin is seeded)");
            console.log(`   Email    : ${ADMIN_EMAIL}`);
            console.log(`   Password : ${ADMIN_PASS}`);
            console.log(`   Role     : admin`);
            console.log("   Donor & Fundraiser → Register normally (no default seeding)");
        } else {
            console.log("✅ Default admin already exists");
        }

        app.listen(PORT, "0.0.0.0", () => {
            logger.info(`🚀 SafeDonate Server running on http://localhost:${PORT}`);
            logger.info(`🌐 Frontend: http://localhost:5173`);
            logger.info(`🔑 Google OAuth ready`);
        });
    })
    .catch((err) => {
        logger.error("MongoDB connection failed:", err.message);
        console.error(err);
        process.exit(1);
    });