
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import OpenAI from "openai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "./.env.local" }); // Adjust path if .env.local is in project root

// Configuration constants
const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
});
//const OPENAI_API_KEY = process.env.OPEN_API_KEY;
const QDRANT_URL = "http://localhost:6333";
const COLLECTION_NAME = "pdf_docs";
const EMBEDDING_MODEL = "text-embedding-3-small";

// Initialize OpenAI Embeddings (singleton instance)
const embeddings = new OpenAIEmbeddings({
  model: EMBEDDING_MODEL,
  apiKey: openai.apiKey,
});

// Function to initialize QdrantVectorStore
async function getVectorStore() {
  try {
    const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
      url: QDRANT_URL,
      collectionName: COLLECTION_NAME,
    });
    console.log("QdrantVectorStore initialized");
    return vectorStore;
  } catch (error) {
    console.error("Error initializing QdrantVectorStore:", error);
    throw error;
  }
}

// Export reusable components
export { openai, embeddings, getVectorStore };