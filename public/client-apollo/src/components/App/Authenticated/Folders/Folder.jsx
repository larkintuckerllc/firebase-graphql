import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { graphql } from 'react-apollo';
import { DELETE_FOLDER_GQL, FOLDERS_GQL } from '../../../../strings';

class Folder extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleOpenClick = this.handleOpenClick.bind(this);
  }
  handleDeleteClick() {
    const { folder, mutate } = this.props;
    mutate({
      variables: {
        id: folder.id,
      },
    });
  }
  handleOpenClick() {
    const { folder, openFolder } = this.props;
    openFolder(folder);
  }
  render() {
    const { folder } = this.props;
    return (
      <li>
        <span role="link" tabIndex="-1" onClick={this.handleOpenClick}>{folder.name}</span>
        <i
          role="button"
          tabIndex="-1"
          className="material-icons"
          onClick={this.handleDeleteClick}
        >
          delete
        </i>
      </li>
    );
  }
}
Folder.propTypes = {
  // eslint-disable-next-line
  folder: PropTypes.object.isRequired,
  openFolder: PropTypes.func.isRequired,
  mutate: PropTypes.func.isRequired,
};
export default graphql(
  DELETE_FOLDER_GQL,
  {
    options: {
      update: (store, { data: { deleteFolder } }) => {
        const data = store.readQuery({ query: FOLDERS_GQL });
        const index = data.folders.findIndex(o => o.id === deleteFolder.id);
        data.folders.splice(index, 1);
        store.writeQuery({ query: FOLDERS_GQL, data });
      },
    },
  },
)(Folder);
