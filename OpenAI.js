import OpenAI from "openai";

const openai = new OpenAI({ apiKey: 'sk-proj-j2Rxy7058DdQWRweJgVbT3BlbkFJEUcQoqwpjtmsKYa29ijO' });

async function main() {
    const completion = await openai.chat.completions.create({
        messages: [{
            role: "user",
            content: "Hello World!"
        }],
        model: "gpt-4-0125-preview",
    });
    console.log(completion.choices[0]);
}

main();