import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      nameUser: '',
    };
  }

  getUserHandler = async () => {
    const { nameUser } = this.state;
    if (nameUser === '') {
      getUser().then((user) => {
        this.setState({ nameUser: user.name });
      });
    }
  };

  render() {
    this.getUserHandler();
    const { nameUser } = this.state;
    return (

      <header data-testid="header-component">

        <div data-testid="header-user-name">
          {nameUser.length === 0 && <Loading />}
          {nameUser}
        </div>
      </header>
    );
  }
}

export default Header;
