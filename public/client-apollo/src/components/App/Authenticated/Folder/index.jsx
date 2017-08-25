import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Update from './Update';
import * as fromFolderOpen from '../../../../ducks/folderOpen';

const Folder = ({ closeFolder, folder }) => (
  <div>
    <div role="link" tabIndex="-1" onClick={closeFolder}>Back</div>
    <Update
      closeFolder={closeFolder}
      folder={folder}
    />
  </div>
);
Folder.propTypes = {
  closeFolder: PropTypes.func.isRequired,
  // eslint-disable-next-line
  folder: PropTypes.object.isRequired,
};
export default connect(
  (state, { folders }) => ({
    folder: folders.find(o => o.id === fromFolderOpen.getFolderOpen(state)),
  }),
  {
    closeFolder: fromFolderOpen.closeFolder,
  },
)(Folder);
