import React from 'react';
import Header from './Header';

class Profile extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile"> </div>
      </>
    );
  }
}

export default Profile;
