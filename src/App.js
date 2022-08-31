import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';
import Album from './components/Album';
import Favorites from './components/Favorites';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import NotFound from './components/NotFound';
import { createUser } from './services/userAPI';

class App extends React.Component {
  state = {
    isSaveButtonDisabled: true,
    username: '',
    liberado: '',
    loading: false,
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { username } = this.state;
      const USERNAME_MIN_CHAR = 3;
      this.setState({
        isSaveButtonDisabled: (username.length < USERNAME_MIN_CHAR),
      });
    });
  };

  onJoinButtonClick = async () => {
    const { username } = this.state;
    this.setState({
      loading: true,
    });
    createUser({ name: username })
      .then((response) => response === 'OK'
      && this.setState({ liberado: true, loading: false }));
  };

  render() {
    const { isSaveButtonDisabled, username, liberado, loading } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            { loading && <p>Carregando...</p> }
            { liberado ? <Redirect to="/search" /> : <Login
              username={ username }
              onInputChange={ this.onInputChange }
              isSaveButtonDisabled={ isSaveButtonDisabled }
              onJoinButtonClick={ this.onJoinButtonClick }
            />}
          </Route>
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
