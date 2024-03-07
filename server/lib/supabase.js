import {createClient} from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL_LC_CHATBOT;
const supabaseApiKey = process.env.SUPABASE_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseApiKey);

import {RecursiveCharacterTextSplitter} from "langchain/text_splitter";
import fs from 'node:fs';
import path from 'path';
import {AzureOpenAI, ChatOpenAI} from "@langchain/openai";
import {createClient} from "@supabase/supabase-js";
import {OpenAIEmbeddings} from "@langchain/openai";
import {SupabaseVectorStore} from "@langchain/community/vectorstores/supabase";

//Adding an AI that gives extra information about shipping to other places or something like that? So feed the AI extra information through an API
try{
    const data = fs.readFileSync(path.resolve('./files/nerdy.txt'), "utf8");
    const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            separators: ['/n/n', '/n', ' ', ''],
            chunkOverlap: 50
        }
    )
    const output = await splitter.createDocuments([data])
    const supabaseUrl = process.env.SUPABASE_URL_LC_CHATBOT;
    const supabaseApiKey = process.env.SUPABASE_API_KEY;

    const azureOpenAIApiKey = process.env.AZURE_OPENAI_API_KEY;
    const azureOpenAIApiInstanceName = process.env.INSTANCE_NAME;
    const azureOpenAIApiDeploymentName = process.env.ENGINE_NAME;
    const azureOpenAIApiVersion = process.env.OPENAI_API_VERSION;


    const supabase = createClient(supabaseUrl, supabaseApiKey);


    const embeddings = new OpenAIEmbeddings({
        openAIApiKey: azureOpenAIApiKey,
        azureOpenAIApiInstanceName,
        azureOpenAIApiDeploymentName,
        azureOpenAIApiVersion,
    })

    await SupabaseVectorStore.fromDocuments(
        output,
        embeddings,
        {
            supabase
        }
    )
} catch (error){
    console.log(error)
}
