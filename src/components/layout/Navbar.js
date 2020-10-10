import React from 'react';
import { useSelector } from 'react-redux';
import {useHistory} from 'react-router';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';

function Navbar(props) {
  const validity = useSelector((state) => state.valid);
  const profPic = useSelector((state) => state.photo);

  const history = useHistory();

  let rightButton = (
    <Link className="navbar-brand" to="/auth">
      Login
    </Link>
  );

  const logout = () => {
    props.signout();
    firebase.auth().signOut();
    history.push('/auth');
  };

  if (validity) {
    rightButton = (
      <div className="dropdown">
        <button
          className="btn btn-primary"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="dropdown-menu dropdown-menu-right"
          aria-labelledby="dropdownMenuButton"
        >
          <Link className="dropdown-item" to="#">
            Profile
          </Link>
          <Link className="dropdown-item" to="#">
            My groups
          </Link>
          <Link className="dropdown-item" to="#" onClick={logout}>
            Logout
          </Link>
        </div>
      </div>
    );
  }

  
  const navbar = validity === true ? (
    <nav
      className="navbar navbar-light bg-primary"
      style={{ padding: '0', width: '100vw', margin: '0' }}
    >
      <Link className="navbar-brand" to="/">
        <img
          src={profPic}
          alt="profile"
          style={{ width: '3vh', marginLeft: '15px' }}
        />
      </Link>
      {rightButton}
    </nav>
  ) : <div className="title-text">
        <h2>Task Distributor</h2>
        <h4>App slogan here</h4>
      </div>;

  return navbar;
}

const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => dispatch(actionCreators.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Navbar);
