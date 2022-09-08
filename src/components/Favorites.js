import React, { Component } from 'react';
import Loading from './Loading';
import MusicCard from './MusicCard';
import Header from './Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    loading: true,
    myFavSongs: [],
  };

  componentDidMount() {
    const getEm = async () => {
      const algo = await getFavoriteSongs();
      this.setState({
        myFavSongs: algo,
        loading: false,
      });
    };
    getEm();
  }

  render() {
    const { loading, myFavSongs } = this.state;
    const sayittrue = true;
    return (
      <div>
        <Header />
        { loading ? <Loading />
          : (
            <div data-testid="page-favorites" className="container">
              <h1>Favoritas</h1>
              <div className="container">
                { myFavSongs.map((cada, index) => (
                  <MusicCard
                    key={ index }
                    objDaMusica={ cada }
                    previewUrl={ cada.previewUrl }
                    trackName={ cada.trackName }
                    trackId={ cada.trackId }
                    mostrArtista={ sayittrue }
                  />
                )) }
              </div>
            </div>
          ) }
      </div>
    );
  }
}
