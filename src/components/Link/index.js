import React from 'react';
import PropTypes from 'prop-types';

function Link({ link }) {
  const { description, url } = link;

  return (
    <li>
      {description} ({url})
    </li>
  );
}

Link.propTypes = {
  link: PropTypes.shape({
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Link;
