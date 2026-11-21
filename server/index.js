import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import ContactSubmission from "./models/ContactSubmission.js";

// dotenv.config();
dotenv.config({ path: "./server/.env" });

const app = express();
const port = Number(process.env.PORT || 3001);
const mongoUri = process.env.MONGO_URI;
const clientOrigin = process.env.CLIENT_ORIGIN;

app.disable("x-powered-by");
app.use(cors(clientOrigin ? { origin: clientOrigin } : undefined));
app.use(express.json({ limit: "32kb" }));

const submissionWindows = new Map();

const rateLimit = (request, response, next) => {
  const key = request.ip || "unknown";
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const entry = submissionWindows.get(key);

  if (!entry || now - entry.startedAt > windowMs) {
    submissionWindows.set(key, { startedAt: now, count: 1 });
    return next();
  }

  if (entry.count >= 5) {
    return response.status(429).json({
      error:
        "Too many messages submitted from this address. Please try again later.",
    });
  }

  entry.count += 1;
  return next();
};

app.get("/api/health", (_request, response) => {
  response.json({
    ok: true,
    database:
      mongoose.connection.readyState === 1 ? "connected" : "not connected",
  });
});

app.post("/api/contact", rateLimit, async (request, response) => {
  const { name, email, subject, message } = request.body || {};
  const trimmedName = typeof name === "string" ? name.trim() : "";
  const trimmedEmail = typeof email === "string" ? email.trim() : "";
  const trimmedSubject = typeof subject === "string" ? subject.trim() : "";
  const trimmedMessage = typeof message === "string" ? message.trim() : "";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    trimmedName.length < 2 ||
    trimmedName.length > 100 ||
    !emailPattern.test(trimmedEmail) ||
    trimmedSubject.length < 2 ||
    trimmedSubject.length > 200 ||
    trimmedMessage.length < 10 ||
    trimmedMessage.length > 5000
  ) {
    return response.status(400).json({
      error: "Please provide a valid name, email, subject, and message.",
    });
  }

  if (mongoose.connection.readyState !== 1) {
    return response.status(503).json({
      error:
        "The contact database is not configured. Please use the email link instead.",
    });
  }

  try {
    await ContactSubmission.create({
      name: trimmedName,
      email: trimmedEmail,
      subject: trimmedSubject,
      message: trimmedMessage,
    });
    return response.status(201).json({ ok: true });
  } catch (error) {
    console.error("Unable to save contact submission:", error);
    return response.status(500).json({
      error:
        "Your message could not be saved. Please try the email link instead.",
    });
  }
});

async function start() {
  if (!mongoUri) {
    console.warn(
      "MONGO_URI is missing. The contact API will remain unavailable until MongoDB is configured.",
    );
  } else {
    try {
      await mongoose.connect(mongoUri);
      console.log("MongoDB connected.");
    } catch (error) {
      console.error("MongoDB connection failed:", error.message);
    }
  }

  app.listen(port, () => {
    console.log(`Portfolio API listening on http://127.0.0.1:${port}`);
  });
}

start();
