import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const msgStore = [];

const port = 8080;
const app = express();
const corsMiddleware = cors({origin: true, credentials: true});

app.use(corsMiddleware);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/message', bodyParser.json(), (req, res) => {
  const {name, text} = req.body;
  msgStore.push({name, text, time: new Date()});
  res.send(req.body);
});

app.get('/sse', (req, res) => {
  res.set('Cache-Control', 'no-cache');
  res.set('Content-Type', 'text/event-stream');
  res.set('Connection', 'keep-alive');
  res.flushHeaders();

  setInterval(() => {
    const msg = msgStore.shift();
    if (msg) {
      res.write(`data:${msg.text}\n\n`);
    } else {
      res.write(':No new message\n\n');
    }
  }, 1000);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});