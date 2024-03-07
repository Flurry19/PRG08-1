import {ChatOpenAI, OpenAIEmbeddings} from "@langchain/openai";

const azureOpenAIApiKey = process.env.AZURE_OPENAI_API_KEY;
// const azureOpenAIApiInstanceName = process.env.INSTANCE_NAME;
const azureOpenAIApiDeploymentName = process.env.ENGINE_NAME;
// const azureOpenAIApiVersion = process.env.OPENAI_API_VERSION;

export const llm = new ChatOpenAI({
    openAIApiKey: azureOpenAIApiKey,
    modelName: azureOpenAIApiDeploymentName,
    temperature: 0.9,
})

export const embeddings = new OpenAIEmbeddings({
    openAIApiKey: azureOpenAIApiKey,
})

console.log(embeddings);
