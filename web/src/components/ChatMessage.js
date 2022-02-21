import PropTypes from 'prop-types';
import Avatar from './Avatar';

function ChatMessage(props) {
  const {name, text} = props;
  return (
      <div className="flex items-center pt-1">
        <Avatar className="w-10 h-10" name={name}/>
        <span className="p-3 text-gray-100">{text}</span>
      </div>
  );
}

ChatMessage.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default ChatMessage;