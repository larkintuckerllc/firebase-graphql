import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import * as fromFolderOpen from '../../../ducks/folderOpen';
import { FOLDERS_GQL } from '../../../strings';
import Folder from './Folder';
import Folders from './Folders';
import Frame from './Frame';
import Logout from './Logout';
import Welcome from './Welcome';

// FOR PRODUCTION NEED TO LOCK FOLDERS WHEN EDITTING
const Authenticated = ({
  data: {
    loading,
    folders,
  },
  name,
  isFolderOpen,
  openFolder,
}) => {
  if (loading) return <div>Loading</div>;
  return (
    <Frame>
      <Welcome name={name} />
      <Logout />
      { isFolderOpen ?
        <Folder
          folders={folders}
        /> :
        <Folders
          folders={folders}
          openFolder={openFolder}
        />
      }
    </Frame>
  );
};
Authenticated.propTypes = {
  data: PropTypes.shape({
    folders: PropTypes.array,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  isFolderOpen: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  openFolder: PropTypes.func.isRequired,
};
Authenticated.defaultProps = {
  folderOpen: null,
};
const AuthenticatedConnected = connect(
  state => ({
    isFolderOpen: fromFolderOpen.getIsFolderOpen(state),
  }),
  {
    openFolder: fromFolderOpen.openFolder,
  },
)(Authenticated);
export default graphql(FOLDERS_GQL)(AuthenticatedConnected);
