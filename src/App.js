import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Loading from './components/Loading';
import Search from './components/Search';
import Album from './components/Album';
import Favorites from './components/Favorites';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import NotFound from './components/NotFound';
import { createUser } from './services/userAPI';
import searchAlbumsAPI from './services/searchAlbumsAPI';

class App extends React.Component {
  state = {
    loading: false,
    username: '',
    isSaveButtonDisabled: true,
    liberado: '',
    searchString: '',
    isSearchButtonDisabled: true,
    searchResults: [],
    bF: false,
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

  musicSearch = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { searchString } = this.state;
      const SEARCH_MIN_CHAR = 2;
      this.setState({
        isSearchButtonDisabled: (searchString.length < SEARCH_MIN_CHAR),
      });
    });
  };

  searchingFor = async () => {
    const { searchString } = this.state;
    const something = await searchAlbumsAPI(searchString);
    this.setState({
      searchResults: something,
      bF: true,
    });
  };

  loading = () => {
    const { loading } = this.state;
    this.setState({
      loading: !loading,
    });
  };

  onJoinButtonClick = async () => {
    const { username } = this.state;
    this.loading();
    createUser({ name: username })
      .then((response) => response === 'OK'
      && this.setState({ liberado: true, loading: false }));
  };

  render() {
    const { isSaveButtonDisabled, username,
      liberado, loading, isSearchButtonDisabled,
      searchString, searchResults, bF } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            { loading && <Loading /> }
            { liberado ? <Redirect to="/search" /> : <Login
              username={ username }
              onInputChange={ this.onInputChange }
              isSaveButtonDisabled={ isSaveButtonDisabled }
              onJoinButtonClick={ this.onJoinButtonClick }
            />}
          </Route>
          <Route exact path="/search">
            <Search
              musicSearch={ this.musicSearch }
              searchString={ searchString }
              isSearchButtonDisabled={ isSearchButtonDisabled }
              searchingFor={ this.searchingFor }
              searchResults={ searchResults }
              bF={ bF }
            />
          </Route>
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
