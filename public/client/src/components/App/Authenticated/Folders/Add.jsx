import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import * as fromFolders from '../../../../ducks/folders';

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
    const { addFolder, resetForm } = this.props;
    addFolder({
      name,
    });
    resetForm();
  }
  render() {
    return <AddForm onSubmit={this.handleSubmit} />;
  }
}
AddSubmit.propTypes = {
  addFolder: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
};
export default connect(
  null,
  {
    addFolder: fromFolders.addFolder,
    resetForm: () => reset(ADD_FORM),
  },
)(AddSubmit);
