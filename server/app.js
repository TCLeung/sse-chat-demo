import express from 'express';
import cors from 'cors';
import {MessageRepository} from './message.js';
import {v4 as uuidv4} from 'uuid';

const messageRepository = new MessageRepository();

const port = 8080;
const app = express();
const corsMiddleware = cors({origin: true, credentials: true});

app.use(corsMiddleware);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/message', express.json(), (req, res) => {
  const {name, text} = req.body;
  const message = {id: uuidv4(), name, text, time: new Date()};
  messageRepository.publishMessage(message);
  res.send(req.body);
});

app.get('/sse', (req, res) => {
  // Set appropriate headers
  res.set('Cache-Control', 'no-cache');
  res.set('Content-Type', 'text/event-stream');
  res.set('Connection', 'keep-alive');
  res.flushHeaders();

  // Send comment regularly to keep connection alive
  const intervalId = setInterval(() => {
    res.write(':keep-alive\n\n');
  }, 60 * 1000);

  // Subscribe to message store
  const subscriptionId = messageRepository.subscribe(message => {
    res.write(`data:${JSON.stringify(message)}\n\n`);
  });

  // Handle connection closed
  res.on('close', () => {
    console.debug('Connection closed by client');
    clearInterval(intervalId);
    messageRepository.unsubscribe(subscriptionId);
    res.end();
  });
});

app.listen(port, () => {
  console.info(`Server listening on port ${port}`);
});