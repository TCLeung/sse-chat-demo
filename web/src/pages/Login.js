import {useState} from 'react';
import Avatar from '../components/Avatar';
import PropTypes from 'prop-types';

function Login(props) {
  const {onLogin} = props;

  const [username, setUsername] = useState('');
  const handleInputChanged = event => setUsername(event.target.value);

  const handleFormSubmitted = (event) => {
    event.preventDefault();
    if (username) {
      onLogin(username.trim());
    }
  };

  return (
      <div className="bg-blue-300 h-screen w-screen flex items-center justify-center">
        <form className="w-full md:w-1/3 bg-white rounded-lg pt-6" onSubmit={handleFormSubmitted}>
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-7">
            SSE chat demo
          </h2>
          <div className="flex justify-center mb-4">
            <Avatar className="w-64 h-64" name={username}/>
          </div>
          <div className="px-12 pb-10">
            <input type="text"
                   className="w-full border rounded px-3 py-2 mb-3 text-gray-700 focus:outline-none"
                   placeholder="Pick a nickname and join :)"
                   value={username}
                   onChange={handleInputChanged}
            />
            <button type="submit"
                    className="w-full py-2 rounded-full bg-blue-600 text-gray-100 focus:outline-none"
            >
              Join chat
            </button>
          </div>
        </form>
      </div>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default Login;