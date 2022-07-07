import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
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
        <Route exact path="/" component={ Login } />
        <Route path="/search" component={ Search } />
        <Albums />
        <Favorites />
        <Profile />
        <ProfileEdit />
        <NotFound />
      </BrowserRouter>);
  }
}

export default App;
