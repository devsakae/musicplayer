import React, { Component } from 'react';
import Loading from './Loading';
import MusicCard from './MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

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

  favTheSong = async (ev, obj) => {
    this.setState({
      loading: true,
    });
    await removeSong(obj);
    const gfs = await getFavoriteSongs();
    this.setState({
      loading: false,
      myFavSongs: gfs,
    });
  };

  render() {
    const { loading, myFavSongs } = this.state;
    return (
      <div>
        { loading ? <Loading />
          : (
            <div data-testid="page-favorites" className="container">
              <h1>Favoritas</h1>
              <div className="container">
                { myFavSongs.map((cada, index) => (index > 0) && (
                  <MusicCard
                    key={ index }
                    objDaMusica={ cada }
                    previewUrl={ cada.previewUrl }
                    trackName={ cada.trackName }
                    trackId={ cada.trackId }
                    listaDeFavoritas={ myFavSongs }
                    favTheSong={ this.favTheSong }
                  />
                )) }
              </div>
            </div>
          ) }
      </div>
    );
  }
}
