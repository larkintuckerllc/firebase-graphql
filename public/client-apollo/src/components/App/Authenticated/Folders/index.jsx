import React from 'react';
import { PropTypes } from 'prop-types';
import Add from './Add';
import Folder from './Folder';

const Folders = ({ folders, openFolder }) => (
  <div>
    <Add />
    <ul>
      {folders.map(folder => (
        <Folder
          folder={folder}
          key={folder.id}
          openFolder={openFolder}
        />
      ))}
    </ul>
  </div>
);
Folders.propTypes = {
  // eslint-disable-next-line
  folders: PropTypes.array.isRequired,
  openFolder: PropTypes.func.isRequired,
};
export default Folders;
