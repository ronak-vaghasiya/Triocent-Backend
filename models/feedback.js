const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  product: { type: String, required: true },
  city: { type: String, required: true },
  message: { type: String },
  date: { type: String, required: true },
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
