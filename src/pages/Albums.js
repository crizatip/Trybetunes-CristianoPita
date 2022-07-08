import React from 'react';
import Header from './Header';

class Albums extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-album"> </div>
      </>
    );
  }
}

export default Albums;
