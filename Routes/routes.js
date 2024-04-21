import OpenAI from "openai";
import axios from "axios";
const openai = new OpenAI();

const conversation = [];

export default function Routes(app) {

    // OPENAI API
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

    // EXERCISEDB API
    const getExercises = async (req, res) => {
        const options = {
            method: 'GET',
            url: 'https://exercisedb.p.rapidapi.com/exercises/name/' + req.params.search,
            params: { limit: '10' },
            headers: {
                'X-RapidAPI-Key': '57ba4df950msh7c718251e0b1735p162b19jsn8fc729eb5660',
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            res.json(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    app.get("/api/exercises/:search", getExercises);
}