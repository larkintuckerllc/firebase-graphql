import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import * as fromFolders from '../../../ducks/folders';
import * as fromFolderOpen from '../../../ducks/folderOpen';
import Folder from './Folder';
import Folders from './Folders';
import Frame from './Frame';
import Logout from './Logout';
import Welcome from './Welcome';

// FOR PRODUCTION NEED TO LOCK FOLDERS WHEN EDITTING
class Authenticated extends Component {
  componentDidMount() {
    const { fetchFolders } = this.props;
    fetchFolders();
  }
  render() {
    const {
      closeFolder,
      name,
      folders,
      isFolderOpen,
      openFolder,
      removeFolder,
    } = this.props;
    return (
      <Frame>
        <Welcome name={name} />
        <Logout />
        {isFolderOpen ?
          <Folder closeFolder={closeFolder} /> :
          <Folders
            folders={folders}
            openFolder={openFolder}
            removeFolder={removeFolder}
          />}
      </Frame>
    );
  }
}
Authenticated.propTypes = {
  closeFolder: PropTypes.func.isRequired,
  fetchFolders: PropTypes.func.isRequired,
  // eslint-disable-next-line
  folders: PropTypes.array.isRequired,
  isFolderOpen: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  openFolder: PropTypes.func.isRequired,
  removeFolder: PropTypes.func.isRequired,
};
export default connect(
  state => ({
    folders: fromFolders.getFolders(state),
    isFolderOpen: fromFolderOpen.getIsFolderOpen(state),
  }),
  {
    closeFolder: fromFolderOpen.closeFolder,
    fetchFolders: fromFolders.fetchFolders,
    openFolder: fromFolderOpen.openFolder,
    removeFolder: fromFolders.removeFolder,
  },
)(Authenticated);
