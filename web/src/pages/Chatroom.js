import PropTypes from 'prop-types';
import Avatar from '../components/Avatar';
import axios from 'axios';
import {useEffect, useRef, useState} from 'react';
import ChatMessage from '../components/ChatMessage';
import GithubLinkButton from '../components/GithubLinkButton';

function Chatroom(props) {
  const {username} = props;

  const [text, setText] = useState('');
  const handleTextSubmitted = async (event) => {
    event.preventDefault();
    if (text) {
      const trimmed = text.trim();
      setText('');
      try {
        await axios.post('//localhost:8080/message', {
          name: username,
          text: trimmed
        });
      } catch (error) {
        console.error('Post message failed', error);
      }
    }
  };

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

  // Automatically scroll to the latest one when new message comes
  const lastMessageRef = useRef(null);
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  return (
      <div className="bg-blue-300 h-screen w-screen flex flex-col">
        {/* Header */}
        <div className="flex-none bg-white px-3 py-2 shadow flex items-center">
          <h1 className="font-bold text-2xl">SSE chat demo</h1>
          <div className="flex-auto"/>
          <GithubLinkButton href="https://github.com/TCLeung/sse-chat-demo" target="_blank"/>
        </div>
        {/* Chats view */}
        <div className="grow overflow-y-auto p-3">
          {messages.map(m => <ChatMessage key={m.id} name={m.name} text={m.text} date={m.time}/>)}
          <div ref={lastMessageRef}/>
        </div>
        {/* Text input */}
        <form className="flex-none flex items-center p-3" onSubmit={handleTextSubmitted}>
          <Avatar className="w-10 h-10" name={username}/>
          <input type="text"
                 className="ml-2 flex-auto rounded"
                 placeholder="Say something :) Press ENTER to send"
                 value={text}
                 onChange={e => setText(e.target.value)}
          />
        </form>
      </div>
  );
}

Chatroom.propTypes = {
  username: PropTypes.string.isRequired
};

export default Chatroom;