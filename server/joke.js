import { ChatOpenAI } from "@langchain/openai"

console.log("hello world");
console.log(process.env.AZURE_OPENAI_API_KEY);



const model = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
})

const question = await model.invoke("Tell a joke")
console.log(question.content)
