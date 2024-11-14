// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Import models
const Feedback = require("./models/feedback");
const Contact = require("./models/contact");

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

// MongoDB connection setup
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB connected");
    } catch (err) {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    }
  };

// Call connectDB to establish MongoDB connection
connectDB();

// API Routes
// Feedback Route
app.post("/api/feedback", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error in feedback submission:", error);
    res
      .status(500)
      .json({ error: "Failed to submit feedback. Please try again." });
  }
});

// Contact Route
app.post("/api/contact", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error in contact form submission:", error);
    res.status(500).json({ error: "Failed to submit form. Please try again." });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
