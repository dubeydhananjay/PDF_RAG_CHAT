import { Worker } from "bullmq";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { Document } from "@langchain/core/documents";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";
import { getVectorStore } from "./utils/vectorStore.js";

const worker = new Worker(
    'file_upload_queue',
    async(job) => {
        const data = JSON.parse(job.data);
        console.log(data);
        /*
        Path: data.path
        read the pdf from path
        chunk the pdf
        call the openai embedding model for every chunk
        store the chunk in qdrantdb
        */
        //Load PDF
        const loader = new PDFLoader(data.path);
        const docs = await loader.load();
        await (await getVectorStore()).addDocuments(docs);
        console.log('All docs are added to vectore store');
    },
    { concurrency: 100, connection: {
        host: 'localhost',
        port: '6379'
    },
    }
);