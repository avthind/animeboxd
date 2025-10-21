import express from "express";
import axios from "axios";
import Anime from "../models/Anime.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
const ANILIST_API = "https://graphql.anilist.co";

// 🆕 Get new/recent anime releases
router.get("/trending", async (req, res) => {
  try {
    const query = `
      query {
        Page(page: 1, perPage: 25) {
          media(type: ANIME, sort: START_DATE_DESC) {
            id
            title { romaji english native }
            coverImage { large medium }
            description
            genres
            episodes
            averageScore
            startDate { year month day }
          }
        }
      }
    `;

    const response = await axios.post(ANILIST_API, {
      query,
    });

    const results = response.data.data.Page.media;
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching new anime" });
  }
});

// ⭐ Get trending/popular anime
router.get("/popular", async (req, res) => {
  try {
    const query = `
      query {
        Page(page: 1, perPage: 25) {
          media(type: ANIME, sort: TRENDING_DESC) {
            id
            title { romaji english native }
            coverImage { large medium }
            description
            genres
            episodes
            averageScore
          }
        }
      }
    `;

    const response = await axios.post(ANILIST_API, {
      query,
    });

    const results = response.data.data.Page.media;
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching trending anime" });
  }
});

// 🔍 Search anime by title
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    const query = `
      query ($search: String) {
        Page(page: 1, perPage: 10) {
          media(search: $search, type: ANIME) {
            id
            title { romaji english native }
            coverImage { large medium }
            description
            genres
            episodes
            averageScore
          }
        }
      }
    `;

    const response = await axios.post(ANILIST_API, {
      query,
      variables: { search: q },
    });

    const results = response.data.data.Page.media;
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching anime data" });
  }
});

// 📄 Get anime details by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      query ($id: Int) {
        Media(id: $id, type: ANIME) {
          id
          title { romaji english native }
          coverImage { large medium }
          description
          genres
          episodes
          averageScore
        }
      }
    `;

    const response = await axios.post(ANILIST_API, {
      query,
      variables: { id: parseInt(id) },
    });

    res.json(response.data.data.Media);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching anime details" });
  }
});

export default router;

