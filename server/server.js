const Groq = require("groq-sdk");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

app.get("/", (req, res) => {
    res.json({
        message: "AI Chat Assistant API is running"
    });
});

app.post("/api/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                error: "Message is required"
            });
        }

        const completion = await client.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: message
                }
            ],
            model: "openai/gpt-oss-20b"
        });

        const answer = completion.choices[0].message.content;

        res.json({
            answer: answer
        });

    } catch (error) {
        console.error("Groq Error:", error);

        res.status(500).json({
            error: error.message
        });
    }
});


app.get("/api/models", async (req, res) => {
    try {
        const models = await client.models.list();

        res.json(
            models.data.map((model) => model.id)
        );

    } catch (error) {
        console.error("Models Error:", error);

        res.status(500).json({
            error: error.message
        });
    }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});