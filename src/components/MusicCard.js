import React, { Component } from 'react';
import teste from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './MusicCard.css';

export default class MusicCard extends Component {
  state = {
    loading: true,
    listaDeFavoritas: [],
  };

  componentDidMount() {
    const getEm = async () => {
      const gfs = await getFavoriteSongs();
      this.setState({
        listaDeFavoritas: gfs,
        loading: false,
      });
    };
    getEm();
  }

  favTheSong = async (ev, obj) => {
    const { target: { checked } } = ev;
    if (checked) await addSong(obj);
    else await removeSong(obj);
    const gfs = await getFavoriteSongs();
    this.setState({
      loading: false,
      listaDeFavoritas: gfs,
    });
  };

  render() {
    const { objDaMusica: { previewUrl, trackName, trackId },
      objDaMusica, mostrArtista } = this.props;
    const { loading, listaDeFavoritas } = this.state;
    const sayittrue = true;
    return (
      <div className="songs">
        { loading ? <Loading notext={ sayittrue } addclass="small" />
          : (
            <form>
              <label htmlFor={ trackId }>
                <input
                  id={ trackId }
                  type="checkbox"
                  name={ trackId }
                  defaultChecked={ listaDeFavoritas.length > 0
                    && (listaDeFavoritas.some((e) => e.trackId === trackId)) }
                  onClick={ (ev) => { this.favTheSong(ev, objDaMusica); } }
                />
                Favorita
              </label>
            </form>
          ) }
        <div className="songInfo">
          <h3>{ trackName }</h3>
          { mostrArtista && objDaMusica.artistName }
        </div>
        <div className="songAudio">
          <audio src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            { ' ' }
            <code>audio</code>
            .
          </audio>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: teste.string,
  trackName: teste.string,
}.isRequired;
