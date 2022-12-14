import React, { Component } from 'react';
import teste from 'prop-types';
import Loading from './Loading';
import MusicCard from './MusicCard';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import './Album.css';

export default class Album extends Component {
  /* inicializa o state com o loading verdadeiro e soa (songs of album) em branco; */
  state = {
    loading: true,
    soa: '',
  };

  /* faz o fetch das músicas na montagem do componente, desligando o loading */
  componentDidMount() {
    const getEm = async () => {
      const { match: { params: { id } } } = this.props;
      const fetchado = await getMusics(id);
      this.setState({
        soa: fetchado,
        loading: false,
      });
    };
    getEm();
  }

  render() {
    const { soa, loading } = this.state;
    return (
      <div>
        <Header />
        { loading ? <Loading />
          : (
            <div className="container2">
              <div className="albuminfo">
                <h1 key={ soa[0].artistId }>
                  { soa[0].artistName }
                </h1>
                <img src={ soa[0].artworkUrl100 } alt={ soa[0].artistName } />
                <h3 key={ soa[0].collectionId }>
                  { soa[0].collectionName }
                </h3>
              </div>
              <div className="container">
                { soa.map((cada, index) => (index > 0) && (
                  <MusicCard
                    key={ index }
                    objDaMusica={ cada }
                    previewUrl={ cada.previewUrl }
                    trackName={ cada.trackName }
                    trackId={ cada.trackId }
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
