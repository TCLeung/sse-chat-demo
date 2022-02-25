# SSE chat demo

Showcase of [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) with a simple chat
application in Express and React.js.

## Quickstart

1. Install Node.js 16+ (https://nodejs.org/en/)
2. Start the server

```bash
# Switch to server directory
cd server

# Install dependencies
npm install

# Run the server at port 8080
npm run start
```

3. Start the web UI

```bash
# Switch to web directory
cd web

# Install dependencies
npm install

# Run the UI at port 3000
npm run start
```

## Implementation

Server-sent events (SSE) is a technology enabling a client to receive updates from server automatically. Client is
required to establish a long-lived HTTP connection with server using
the [EventSource API](https://developer.mozilla.org/en-US/docs/Web/API/EventSource). The connection established can only
be used to transfer data from server to client, but not vice versa.

There are 2 endpoints in the application. One is applying SSE for client to subscribe. Another is accepting normal HTTP
POST request for client to send in new messages.

For simplicity, the application is using an in-memory store for user messages. In real use cases, you will want to
replace it with Database or Message queue.

### Server

#### POST /message

Accept new message. Message will be added to an in-memory store and sent to all clients subscribed via SSE.

#### GET /sse

Establish SSE connection. Comments will be sent out regularly to keep the connection alive.

```node
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
```

### Client

#### Chatroom

Set up SSE connection when component is mounted. Listen to the message events and render accordingly.

```js
const eventSource = useRef(null);
const [messages, setMessages] = useState([]);
useEffect(() => {
  eventSource.current = new EventSource('//localhost:8080/sse', {withCredentials: true});
  eventSource.current.onmessage = event => {
    console.info('Event received: ', event);
    const message = JSON.parse(event.data);
    setMessages(prevState => [...prevState, message]);
  };
  return () => {
    eventSource.current?.close();
  };
}, []);
```