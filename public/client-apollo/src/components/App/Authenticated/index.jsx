import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import * as fromFolderOpen from '../../../ducks/folderOpen';
import Folder from './Folder';
import Folders from './Folders';
import Frame from './Frame';
import Logout from './Logout';
import Welcome from './Welcome';

// FOR PRODUCTION NEED TO LOCK FOLDERS WHEN EDITTING
const Authenticated = ({
  closeFolder,
  data: {
    loading,
    folders,
  },
  folderOpen,
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
          closeFolder={closeFolder}
          folder={folders.find(o => o.id === folderOpen)}
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
  closeFolder: PropTypes.func.isRequired,
  data: PropTypes.shape({
    folders: PropTypes.array,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  folderOpen: PropTypes.string,
  isFolderOpen: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  openFolder: PropTypes.func.isRequired,
};
Authenticated.defaultProps = {
  folderOpen: null,
};
const Connected = connect(
  state => ({
    isFolderOpen: fromFolderOpen.getIsFolderOpen(state),
    folderOpen: fromFolderOpen.getFolderOpen(state),
  }),
  {
    closeFolder: fromFolderOpen.closeFolder,
    openFolder: fromFolderOpen.openFolder,
  },
)(Authenticated);
export default graphql(gql`query { folders { id name } }`)(Connected);
