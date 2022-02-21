import PropTypes from 'prop-types';

function Avatar(props) {
  const {name, className} = props;
  const avatarUrl = `https://avatars.dicebear.com/api/bottts/${name.trim()}.svg`;
  return <img className={className} alt={name} src={avatarUrl}/>;
}

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Avatar;