import express from "express";
import OpenAI from "openai";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: "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" // তোম
});

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt required" });

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "512x512"
    });

    res.json({ image_url: result.data[0].url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => console.log("🚀 Running on http://localhost:3000"));
