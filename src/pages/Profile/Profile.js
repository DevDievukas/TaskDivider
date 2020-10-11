import React from 'react';
import {useHistory} from 'react-router';

const Profile = () => {
  const history = useHistory();

  const redirection = () => {
    history.push('/');
  }

  return (
  <div>
  <h1> Profile Page not found!</h1>
  <button onClick={redirection}>redirect</button>
  </div>)
}

export default Profile;