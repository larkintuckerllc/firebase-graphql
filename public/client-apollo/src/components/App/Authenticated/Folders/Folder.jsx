import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class Folder extends Component {
  constructor(props) {
    super(props);
    this.handleOpenClick = this.handleOpenClick.bind(this);
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
};
export default Folder;
