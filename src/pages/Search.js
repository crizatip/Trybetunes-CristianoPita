import React from 'react';
import Header from './Header';
import { getUser } from '../services/userAPI';

class Search extends React.Component {
  getUserHandler = async () => {
    const existentUser = await getUser();
    return existentUser;
  };

  render() {
    return (
      <>
        <Header />
        <div data-testid="page-search"> </div>
      </>
    );
  }
}

export default Search;
