const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/recommend", async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "query is required" });
    }

    // Call Python AI API
    const response = await axios.post(
      "http://127.0.0.1:8000/search",
      { text: query },
      { headers: { "Content-Type": "application/json" } }
    );

    res.json({
      success: true,
      recommendation: response.data
    });

  } catch (error) {
    console.error("AI error:", error.message);

    res.status(500).json({
      success: false,
      error: "AI service not reachable"
    });
  }
});

module.exports = router;
