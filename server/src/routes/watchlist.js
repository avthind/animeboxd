import express from "express";
import Anime from "../models/Anime.js";
import Watchlist from "../models/Watchlist.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ➕ Add anime to watchlist
router.post("/add", protect, async (req, res) => {
  try {
    const { anilistId, title, coverImage, description, genres, episodes, averageScore, status } = req.body;

    // Check if anime exists in DB
    let anime = await Anime.findOne({ anilistId });
    if (!anime) {
      anime = new Anime({ anilistId, title, coverImage, description, genres, episodes, averageScore });
      await anime.save();
    }

    // Check if already in watchlist
    const existing = await Watchlist.findOne({ user: req.user.id, anime: anime._id });
    if (existing)
      return res.status(400).json({ message: "Already in watchlist" });

    const entry = new Watchlist({ user: req.user.id, anime: anime._id, status });
    await entry.save();

    res.json({ message: "Added to watchlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding to watchlist" });
  }
});

// 🗑️ Remove anime from watchlist
router.delete("/remove/:id", protect, async (req, res) => {
  try {
    await Watchlist.findOneAndDelete({ user: req.user.id, anime: req.params.id });
    res.json({ message: "Removed from watchlist" });
  } catch (err) {
    res.status(500).json({ message: "Error removing from watchlist" });
  }
});

// 📋 Get user watchlist
router.get("/", protect, async (req, res) => {
  try {
    const list = await Watchlist.find({ user: req.user.id })
      .populate("anime")
      .sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Error fetching watchlist" });
  }
});

export default router;

