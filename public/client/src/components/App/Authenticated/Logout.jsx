import React from 'react';
import logout from '../../../apis/logout';

const Logout = () => (
  <button
    onClick={logout}
  >Logout</button>
);
export default Logout;
