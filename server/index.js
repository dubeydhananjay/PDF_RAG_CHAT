import express from 'express'
import cors from 'cors'
import multer from 'multer'
import { Queue } from 'bullmq';
import { getVectorStore, openai } from './utils/vectorStore.js';

const queue = new Queue('file_upload_queue', {
  connection: {
    host: 'localhost',
    port: '6379'
}
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
  });
  
  const upload = multer({ storage: storage });

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    return res.json({status: 'All Good!!'});
});
app.post('/upload/pdf', upload.single('pdf'), async (req, res) => {
    await queue.add('file_ready',
    JSON.stringify({
      filename: req.file.originalname,
      destination: req.file.destination,
      path: req.file.path
    })
    );
    return res.json({ message: 'Uploaded!!'});
});

app.get('/chat', async (req, res) => {
  const userQuery = req.query.message;
  if (!userQuery) {
    return res.status(400).json({ error: 'Missing message query parameter' });
  }

  try {
    const vectorStore = await getVectorStore();
    const retriever = vectorStore.asRetriever({ k: 2 });
    const result = await retriever.invoke(userQuery);

    const SYSTEM_REPORT = `You are helpful AI assistant who answers the user questions based on the available context from PDF file.
    Context: ${JSON.stringify(result)}`;

    const chatRes = await openai.chat.completions.create({
      model: 'gpt-4.1',
      messages: [
        { role: 'system', content: SYSTEM_REPORT },
        { role: 'user', content: userQuery }
      ]
    });

    return res.json({
      message: chatRes.choices[0].message.content,
      docs: result
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});


app.listen(8000, () => console.log(`Server started at PORT: ${8000}`));