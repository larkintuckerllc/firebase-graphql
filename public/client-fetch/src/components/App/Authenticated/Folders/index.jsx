import React from 'react';
import { PropTypes } from 'prop-types';
import Add from './Add';
import Folder from './Folder';

const Folders = ({ folders, openFolder, removeFolder }) => (
  <div>
    <Add />
    <ul>
      {folders.map(folder => (
        <Folder
          folder={folder}
          key={folder.id}
          openFolder={openFolder}
          removeFolder={removeFolder}
        />
      ))}
    </ul>
  </div>
);
Folders.propTypes = {
  folders: PropTypes.array.isRequired,
  openFolder: PropTypes.func.isRequired,
  removeFolder: PropTypes.func.isRequired,
};
export default Folders;
