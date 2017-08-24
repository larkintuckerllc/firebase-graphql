import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';

const ADD_FORM = 'ADD_FORM';
const Add = ({ handleSubmit, valid }) => (
  <form onSubmit={handleSubmit}>
    <Field
      component="input"
      name="name"
      placeholder="name"
      type="text"
    />
    <button
      disabled={!valid}
      type="submit"
    >Add</button>
  </form>
);
Add.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
};
const AddForm = reduxForm({
  form: ADD_FORM,
  validate: (values) => {
    const errors = {};
    if (values.name === undefined) errors.name = '400';
    return errors;
  },
})(Add);
AddForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
class AddSubmit extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit({ name }) {
    window.console.log(name);
    const { resetForm } = this.props;
    resetForm();
  }
  render() {
    return <AddForm onSubmit={this.handleSubmit} />;
  }
}
AddSubmit.propTypes = {
  resetForm: PropTypes.func.isRequired,
};
export default connect(
  null,
  {
    resetForm: () => reset(ADD_FORM),
  },
)(AddSubmit);
