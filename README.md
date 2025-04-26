
# 📄 PDF_RAG_CHAT

PDF_RAG_CHAT is a Retrieval-Augmented Generation (RAG) based chatbot that lets you upload PDF files and ask questions about their content. It extracts text, embeds it, retrieves relevant chunks using semantic search (FAISS), and generates context-aware answers using OpenAI models.

---

## ✨ Features

- Upload and interact with multiple PDFs.
- RAG pipeline: text extraction ➔ chunking ➔ embeddings ➔ retrieval ➔ GPT-generated answers.
- Fast semantic search using **FAISS**.
- Frontend built with **Next.js** (TypeScript).
- Backend built with **Express.js** and **LangChain**.
- Dockerized for easy deployment.

---

## 🛠️ Tech Stack

| Area        | Technology |
|-------------|------------|
| Frontend    | Next.js (TypeScript), Tailwind CSS |
| Backend     | Node.js, Express.js, LangChain |
| Vector Store| FAISS |
| LLM         | OpenAI GPT API |
| Deployment  | Docker, Docker Compose |

---

## 📂 Folder Structure

```
PDF_RAG_CHAT/
│
├── client/           # Next.js frontend (user uploads PDFs, chat UI)
│
├── server/           # Node.js backend (handles PDF parsing, FAISS, OpenAI calls)
│   ├── routes/       # API routes (upload, query)
│   ├── utils/        # PDF processing, text chunking, embeddings
│   └── worker.js     # Background processing for heavy tasks
│
├── docker-compose.yml
├── README.md
└── .env (you create this)
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/dubeydhananjay/PDF_RAG_CHAT.git
cd PDF_RAG_CHAT
```

---

### 2. Set Up Environment Variables

Create a `.env` file in the `server/` directory:

```bash
cd server
touch .env
```

Add your OpenAI API Key inside `.env`:

```env
OPENAI_API_KEY=your_openai_api_key
```

---

### 3. Install Dependencies

In both `client/` and `server/` folders:

```bash
cd client
npm install

cd ../server
npm install
```

---

### 4. How To Run Locally

Open **three terminals**:

- First terminal (Frontend):

```bash
cd client
npm run dev
```

- Second terminal (Backend API server):

```bash
cd server
npm run dev
```

- Third terminal (Background Worker):

```bash
cd server
npm run dev:worker
```

Then open your browser at [http://localhost:3000](http://localhost:3000).

---

### 5. Run with Docker (Optional)

You can run everything using Docker Compose:

```bash
docker-compose up --build
```

---

## 🎯 Usage Flow

1. Upload one or multiple PDFs.
2. The backend extracts and chunks the text.
3. Text chunks are embedded and stored using FAISS.
4. When you ask a question, relevant chunks are retrieved.
5. OpenAI GPT generates a context-aware response.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [LangChain](https://www.langchain.dev/) for RAG pipeline structure
- [FAISS](https://github.com/facebookresearch/faiss) for fast similarity search
- [OpenAI](https://platform.openai.com/) for language model API

---

# 🚀 Happy Chatting with your PDFs!
