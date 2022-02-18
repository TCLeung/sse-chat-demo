import {useEffect, useRef, useState} from 'react';
import {AppShell, ScrollArea} from '@mantine/core';
import AppHeader from './AppHeader';
import ChatMessage from './components/ChatMessage';
import Avatar from './components/Avatar';
import axios from 'axios';

function App() {
  const eventSource = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    eventSource.current = new EventSource('//localhost:8080/sse', {withCredentials: true});
    eventSource.current.onmessage = event => {
      console.info('Event received: ', event);
      setMessages(prevState => [...prevState, event.data]);
    };
  }, []);

  const onInputKeyPress = async (e) => {
    if (e.key === 'Enter') {
      try {
        await axios.post('//localhost:8080/message', {
          name: 'ABC',
          text: e.target.value
        });
      } catch (error) {
        console.error('Post message failed', error);
      }
    }
  };

  return (
      <AppShell
          padding="md"
          fixed={true}
          header={<AppHeader height={50}/>}
          styles={{
            root: {height: '100vh'},
            main: {height: 'calc(100vh - 50px)', display: 'flex', flexDirection: 'column'}
          }}
      >
        <ScrollArea styles={{root: {flex: 'auto'}}}>
          {messages.map(m => <ChatMessage name="ABC" text={m}/>)}
        </ScrollArea>
        <div className="flex-none flex items-center">
          <Avatar name="ABC"/>
          <input type="text" placeholder="Say something :)" className="ml-3 flex-auto" onKeyPress={onInputKeyPress}/>
        </div>
      </AppShell>
  );
}

export default App;
