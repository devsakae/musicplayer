import React, { Component } from 'react';
import teste from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { previewUrl, trackName, trackId,
      listaDeFavoritas, objDaMusica, favTheSong } = this.props;
    return (
      <div className="songs">
        <div className="songPiece">
          <h3>{ trackName }</h3>
          <form>
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
              Adicionar às favoritas
            </label>
          </form>
        </div>
        <div className="songPiece">
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
