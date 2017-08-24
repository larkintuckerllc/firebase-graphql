import React from 'react';
import PropTypes from 'prop-types';
import Update from './Update';

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
export default Folder;
