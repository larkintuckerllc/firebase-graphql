import React from 'react';
import PropTypes from 'prop-types';
import Update from './Update';

const Folder = ({ closeFolder }) => (
  <div>
    <div role="link" tabIndex="-1" onClick={closeFolder}>Back</div>
    <Update
      closeFolder={closeFolder}
    />
  </div>
);
Folder.propTypes = {
  closeFolder: PropTypes.func.isRequired,
};
export default Folder;
