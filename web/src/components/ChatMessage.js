import PropTypes from 'prop-types';
import Avatar from './Avatar';
import {DateTime} from 'luxon';

function ChatMessage(props) {
  const {name, text, date} = props;
  const timeString = DateTime.fromISO(date).toLocaleString(DateTime.TIME_24_SIMPLE);
  return (
      <div className="flex items-center pt-1">
        <Avatar className="w-10 h-10 mr-2" name={name}/>
        <div className="px-4 py-2 text-sm bg-gray-100 rounded-t-lg rounded-r-lg shadow">
          <div className="font-bold">{name}</div>
          <div className="flex items-end">
            <span>{text}</span>
            <span className="ml-5 text-xs">{timeString}</span>
          </div>
        </div>
      </div>
  );
}

ChatMessage.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};

export default ChatMessage;