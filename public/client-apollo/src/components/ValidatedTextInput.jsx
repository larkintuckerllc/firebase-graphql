import React from 'react';
import { PropTypes } from 'prop-types';

const ValidatedTextInput = ({ input, placeholder, disabled, meta: { touched, valid } }) => (
  <input
    {...input}
    placeholder={placeholder}
    type="text"
    disabled={disabled}
    className={!valid && touched && 'error'}
  />
);
ValidatedTextInput.propTypes = {
  // eslint-disable-next-line
  input: PropTypes.object.isRequired,
  // eslint-disable-next-line
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};
export default ValidatedTextInput;
