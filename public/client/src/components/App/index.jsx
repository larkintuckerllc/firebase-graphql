import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import * as fromAuth from '../../ducks/auth';
import * as fromFolders from '../../ducks/folders';
import { connectToFirebase } from '../../apis/firebase';
import Authenticated from './Authenticated';
import Loading from './Loading';
import Login from './Login';

class App extends Component {
  componentDidMount() {
    const {
      addFolderSuccess,
      login,
      logout,
      removeFolderSuccess,
      updateFolderSuccess,
    } = this.props;
    connectToFirebase({
      addFolderSuccess,
      login,
      logout,
      removeFolderSuccess,
      updateFolderSuccess,
    });
  }
  render() {
    const { authenticated, authenticating, name } = this.props;
    if (authenticating) return <Loading />;
    if (!authenticated) return <Login />;
    return (<Authenticated
      name={name}
    />);
  }
}
App.propTypes = {
  addFolderSuccess: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  authenticating: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  name: PropTypes.string,
  removeFolderSuccess: PropTypes.func.isRequired,
  updateFolderSuccess: PropTypes.func.isRequired,
};
App.defaultProps = {
  name: null,
};
export default connect(
  state => ({
    authenticated: fromAuth.getAuthenticated(state),
    authenticating: fromAuth.getAuthenticating(state),
    name: fromAuth.getName(state),
  }),
  {
    addFolderSuccess: fromFolders.addFolderSuccess,
    login: fromAuth.login,
    logout: fromAuth.logout,
    removeFolderSuccess: fromFolders.removeFolderSuccess,
    updateFolderSuccess: fromFolders.updateFolderSuccess,
  },
)(App);
