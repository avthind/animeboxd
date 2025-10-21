import mongoose from "mongoose";

const animeSchema = new mongoose.Schema({
  anilistId: { type: Number, required: true, unique: true },
  title: {
    romaji: String,
    english: String,
    native: String,
  },
  coverImage: {
    large: String,
    medium: String,
  },
  description: String,
  genres: [String],
  episodes: Number,
  averageScore: Number,
}, { timestamps: true });

export default mongoose.model("Anime", animeSchema);

