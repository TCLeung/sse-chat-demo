import PropTypes from 'prop-types';
import Avatar from './Avatar';

function ChatMessage(props) {
  const {name, text} = props;
  return (
      <div className="flex items-center">
        <Avatar name={name}/>
        <span className="p-3">{text}</span>
      </div>
  );
}

ChatMessage.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default ChatMessage;