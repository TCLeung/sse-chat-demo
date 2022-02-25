import {GoMarkGithub} from 'react-icons/go';
import PropTypes from 'prop-types';

function GithubLinkButton(props) {
  const {href, target} = props;
  return (
      <a className="flex items-center p-1 border-2 border-gray-400 hover:border-black rounded-md cursor-pointer"
         href={href}
         target={target}
      >
        <GoMarkGithub/>
        <span className="ml-2 text-sm">View on Github</span>
      </a>
  );
}

GithubLinkButton.propTypes = {
  href: PropTypes.string,
  target: PropTypes.string
};

export default GithubLinkButton;