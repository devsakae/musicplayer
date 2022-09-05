import React, { Component } from 'react';
import teste from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { previewUrl, trackName, trackId,
      listaDeFavoritas, objDaMusica, favTheSong } = this.props;
    return (
      <div className="songs">
        <div className="songInfo">
          <form>
            <h3>{ trackName }</h3>
            <label htmlFor={ trackId }>
              <input
                id={ trackId }
                type="checkbox"
                name={ trackId }
                defaultChecked={ listaDeFavoritas.length > 0
                  && (listaDeFavoritas.some((e) => e.trackId === objDaMusica.trackId)) }
                onClick={ (ev) => { favTheSong(ev, objDaMusica); } }
                data-testid={ `checkbox-music-${trackId}` }
              />
              Favorita
            </label>
          </form>
        </div>
        <div className="songAudio">
          <audio data-testid="audio-component" src={ previewUrl } controls>
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
