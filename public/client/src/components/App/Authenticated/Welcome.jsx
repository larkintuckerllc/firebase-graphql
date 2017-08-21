import React from 'react';
import { PropTypes } from 'prop-types';

const Welcome = ({ name }) => (
  <div>Welcome {name}</div>
);
Welcome.propTypes = {
  name: PropTypes.string.isRequired,
};
export default Welcome;
