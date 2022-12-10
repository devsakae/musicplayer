import React from 'react';
import { BrowserRouter, Route, Switch, Redirect, HashRouter } from 'react-router-dom';
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
    lastSearch: '',
    favSongs: [],
  };

  componentDidMount() {
    document.title = 'Simple music player';
  }

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
    this.loading();
    const { searchString } = this.state;
    const something = await searchAlbumsAPI(searchString);
    this.setState({
      lastSearch: searchString,
      searchResults: something,
      searchString: '',
      bF: true,
      loading: false,
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
    const { isSaveButtonDisabled, username, favSongs,
      liberado, loading, isSearchButtonDisabled,
      searchString, searchResults, bF, lastSearch } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          { loading && <Loading /> }
          <Route exact path="/">
            { liberado ? <Redirect to="/search" /> : <Login
              { ...this.props }
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
              lastSearch={ lastSearch }
            />
          </Route>
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites">
            <Favorites
              favSongs={ favSongs }
            />
          </Route>
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit">
            <ProfileEdit />
          </Route>
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
