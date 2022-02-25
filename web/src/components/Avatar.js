import PropTypes from 'prop-types';
import classNames from 'classnames'

function Avatar(props) {
  const {name, className} = props;
  const avatarUrl = `https://avatars.dicebear.com/api/pixel-art-neutral/${name.trim()}.svg`;
  return <img className={classNames('rounded-full', className)} alt={name} src={avatarUrl}/>;
}

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Avatar;