import {useState} from 'react';
import Login from './pages/Login';
import Chatroom from './pages/Chatroom';

function App() {
  const [username, setUsername] = useState('');
  const handleLogin = name => setUsername(name);

  return username ? <Chatroom username={username}/> : <Login onLogin={handleLogin}/>;
}

export default App;
