import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  anime: { type: mongoose.Schema.Types.ObjectId, ref: "Anime", required: true },
  status: { 
    type: String, 
    enum: ["watching", "completed", "planned"], 
    default: "planned" 
  },
}, { timestamps: true });

export default mongoose.model("Watchlist", watchlistSchema);

