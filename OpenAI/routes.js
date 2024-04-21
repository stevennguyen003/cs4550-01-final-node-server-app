import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const conversation = [];

export default function ChatRoutes(app) {
    const getConversation = (req, res) =>
        res.json(conversation);

    const postChat = async (req, res) => {
        const userMessage = req.body;
        conversation.push(userMessage);
        const completion =
            await openai.chat.completions.create({
                messages: conversation, model: "gpt-4",
            });
        const choice = completion.choices[0];
        conversation.push(choice.message);
        res.json(choice.message);
    };

    app.get("/api/openai/conversation", getConversation);
    app.post("/api/openai/conversation", postChat);
}