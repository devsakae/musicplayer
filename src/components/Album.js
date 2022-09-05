import React, { Component } from 'react';
import teste from 'prop-types';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  /* inicializa o state com o loading verdadeiro e soa (songs of album) em branco; */
  state = {
    loading: true,
    soa: '',
    listaDeFavoritas: [],
  };

  /* faz o fetch das músicas na montagem do componente, desligando o loading */
  componentDidMount() {
    const getEm = async () => {
      const { match: { params: { id } } } = this.props;
      const fetchado = await getMusics(id);
      const algo = await getFavoriteSongs();
      this.setState({
        listaDeFavoritas: algo,
        soa: fetchado,
        loading: false,
      });
    };
    getEm();
  }

  favTheSong = async (ev, obj) => {
    const { target: { checked } } = ev;
    this.setState({
      loading: true,
    });
    (checked === false) ? await removeSong(obj) : await addSong(obj);
    const gfs = await getFavoriteSongs();
    this.setState({
      loading: false,
      listaDeFavoritas: gfs,
    });
  };

  render() {
    const { soa, loading, listaDeFavoritas } = this.state;
    return (
      <div>
        { loading ? <Loading />
          : (
            <div data-testid="page-album" className="container">
              <h1
                data-testid="artist-name"
                key={ soa[0].artistId }
              >
                { soa[0].artistName }
              </h1>
              <h2
                data-testid="album-name"
                key={ soa[0].collectionId }
              >
                { soa[0].collectionName }
              </h2>
              <div className="albuns">
                { soa.map((cada, index) => (index > 0) && (
                  <MusicCard
                    key={ index }
                    objDaMusica={ cada }
                    previewUrl={ cada.previewUrl }
                    trackName={ cada.trackName }
                    trackId={ cada.trackId }
                    favTheSong={ this.favTheSong }
                    listaDeFavoritas={ listaDeFavoritas }
                  />
                )) }
              </div>
            </div>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: teste.shape({
    params: teste.shape({
      id: teste.string,
    }),
  }),
}.isRequired;
