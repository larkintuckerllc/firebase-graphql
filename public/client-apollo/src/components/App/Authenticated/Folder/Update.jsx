import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { graphql } from 'react-apollo';
import { UPDATE_FOLDER_GQL } from '../../../../strings';
import ValidatedTextInput from '../../../ValidatedTextInput';

const UPDATE_FORM = 'UPDATE_FORM';
const Update = ({ handleSubmit, pristine, valid }) => (
  <form onSubmit={handleSubmit}>
    <Field
      component={ValidatedTextInput}
      disabled={false}
      name="name"
      props={{ placeholder: 'name' }}
    />
    <button
      disabled={!valid || pristine}
      type="submit"
    >Update</button>
  </form>
);
Update.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
};
const UpdateForm = reduxForm({
  form: UPDATE_FORM,
  validate: (values) => {
    const errors = {};
    if (values.name === undefined || values.name === '') errors.name = '400';
    return errors;
  },
})(Update);
UpdateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
class UpdateSubmit extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit({ name }) {
    const { closeFolder, folder, mutate } = this.props;
    mutate({
      variables: {
        id: folder.id,
        name,
      },
    });
    closeFolder();
  }
  render() {
    const { folder } = this.props;
    return (
      <UpdateForm
        initialValues={folder}
        onSubmit={this.handleSubmit}
      />
    );
  }
}
UpdateSubmit.propTypes = {
  closeFolder: PropTypes.func.isRequired,
  // eslint-disable-next-line
  folder: PropTypes.object.isRequired,
  mutate: PropTypes.func.isRequired,
};
export default graphql(UPDATE_FOLDER_GQL)(UpdateSubmit);
