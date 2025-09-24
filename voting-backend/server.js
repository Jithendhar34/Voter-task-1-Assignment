import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// 🌐 Root route
app.get("/", (req, res) => {
  res.send("🚀 Voting Backend is running on Render!");
});

// 🔗 MongoDB connection (cleaned, no deprecated options)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log("MongoDB connection error ❌", err));

// 🗳 Vote schema
const voteSchema = new mongoose.Schema({
  option: String,
  username: String,
  createdAt: { type: Date, default: Date.now }
});

const Vote = mongoose.model("Vote", voteSchema);

// 📝 Vote routes
app.post("/vote", async (req, res) => {
  const { username, option } = req.body;
  if (!username || !option) return res.status(400).json({ error: "Missing fields" });

  const existing = await Vote.findOne({ username });
  if (existing) return res.status(400).json({ error: "User already voted" });

  const vote = new Vote({ username, option });
  await vote.save();
  res.json({ success: true });
});

app.get("/results", async (req, res) => {
  const votes = await Vote.aggregate([{ $group: { _id: "$option", count: { $sum: 1 } } }]);
  res.json(votes.map(v => ({ option: v._id, votes: v.count })));
});

// 🔌 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
