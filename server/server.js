import dotenv from "dotenv";
import express from 'express';
import { ChatOpenAI } from "@langchain/openai"


dotenv.config();
const app = express();

app.use(express.json());
app.listen(process.env.EXPRESS_PORT, () =>  {
    console.log(`Server running on port ${process.env.EXPRESS_PORT}`);
})

const model = new ChatOpenAI({
    temperature: 0.2,
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
})

    app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get("/joke", async (req, res) =>{
try{
    const question = await model.invoke("Tell a joke")
    console.log(question.content)
    res.json({question: question.content})
} catch (error){
    console.error("error")
}
})

let chatHistory = [];

app.post("/chat", async (req,res) => {
    try{
        const question = req.body.question;
        const engineeredQuestion = `You are a customer service robot for the webshop Nerdy Glazen which sells handengraved drinking glasses. You are very respectful and want to give the best help possible. Only give answers to questions about the webshop or about the products. Answer the following question: ${question} as short as you can`

        if (!question){
            return res.status(400).json({error: 'No question has been asked'})
        }

        let messages = [...chatHistory,
            ["human", engineeredQuestion]
            ];

        const answer = await model.invoke(messages);

        chatHistory.push(["human", question]);
        chatHistory.push(["ai", answer.content]);

        console.log(chatHistory)
        res.json({answer: answer.content})
    } catch(error){
        console.error("Can't get the answer")
    }
})

