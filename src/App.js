import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Albums from './pages/Albums';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <p>TrybeTunes</p>
        <Login>
          <Link to="/"> Login </Link>
        </Login>
        <Search>
          <Link to="/search"> Login </Link>
        </Search>
        <Albums>
          <Link to="/album/:id"> Login </Link>
        </Albums>
        <Favorites>
          <Link to="/favorites"> Login </Link>
        </Favorites>
        <Profile>
          <Link to="/profile"> Login </Link>
        </Profile>
        <ProfileEdit>
          <Link to="/profile/edit"> Login </Link>
        </ProfileEdit>
        <NotFound>
          <Link to=" "> Login </Link>
        </NotFound>
      </BrowserRouter>);
  }
}

export default App;
