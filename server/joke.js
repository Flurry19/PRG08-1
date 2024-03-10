import LlamaAI from "llamaai";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.listen(process.env.EXPRESS_PORT2, () => {
    console.log(`Server running on port ${process.env.EXPRESS_PORT2}`);
});

const apiToken = process.env.LAMA_KEY;
const llamaAPI = new LlamaAI(apiToken);

app.get("/llama", async (req, res) => {
    try {
        const apiRequestJson = {
            "messages": [
                { "role": "user", "content": "Tell me a joke" }
            ],
            "stream": false
        };
        llamaAPI.run(apiRequestJson)
            .then(response => {
                console.log("Response:", response);
                if (response.messages && response.messages.length > 0) {
                    // Access the joke from the response and send it in the JSON response
                    res.json({ joke: response.messages[0].content });
                } else {
                    console.error("No joke found in the response");
                    res.status(500).json({ error: "Failed to fetch joke" });
                }
            })
            .catch(error => {
                console.error("Failed to fetch joke:", error.message);
                res.status(500).json({ error: "Failed to fetch joke" });
            });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
