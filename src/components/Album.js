import React, { Component } from 'react';
import teste from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

export default class Album extends Component {
  /* inicializa o state com o loading verdadeiro e soa (songs of album) em branco; */
  state = {
    loading: true,
    soa: '',
  };

  /* faz o fetch das músicas na montagem do componente, desligando o loading */
  async componentDidMount() {
    console.log(this.props);
    const { match: { params: { id } } } = this.props;
    const fetchado = await getMusics(id);
    this.setState({
      soa: fetchado,
      loading: false,
    });
  }

  render() {
    const { soa, loading } = this.state;
    return (
      <>
        <Header />
        { loading ? <Loading />
          : (
            <div data-testid="page-album" className="container" hidden={ loading }>
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
                    previewUrl={ cada.previewUrl }
                    trackName={ cada.trackName }
                  />
                )) }
              </div>
            </div>
          )}
      </>
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
