import PropTypes from 'prop-types';

function Avatar(props) {
  const {name} = props;
  const avatarUrl = `https://avatars.dicebear.com/api/identicon/${name}.svg`;
  return <img className="w-6 h-6" alt={name} src={avatarUrl}/>;
}

Avatar.propTypes = {
  name: PropTypes.string.isRequired
};

export default Avatar;