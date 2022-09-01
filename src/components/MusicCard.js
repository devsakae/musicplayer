import React, { Component } from 'react';
import teste from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { previewUrl, trackName } = this.props;
    return (
      <div>
        <p>
          { trackName }
        </p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          { ' ' }
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: teste.string,
  trackName: teste.string,
}.isRequired;
