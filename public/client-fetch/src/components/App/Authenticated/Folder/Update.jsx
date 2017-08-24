import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as fromFolderOpen from '../../../../ducks/folderOpen';
import * as fromFolders from '../../../../ducks/folders';
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
    const { closeFolder, folder, updateFolder } = this.props;
    updateFolder({
      ...folder,
      name,
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
  updateFolder: PropTypes.func.isRequired,
};
export default connect(
  state => ({
    folder: fromFolders.getFolder(state, fromFolderOpen.getFolderOpen(state)),
  }),
  {
    updateFolder: fromFolders.updateFolder,
  },
)(UpdateSubmit);
