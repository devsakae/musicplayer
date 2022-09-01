import React, { Component } from 'react';
import teste from 'prop-types';
import Header from './Header';
import '../index.css';

export default class Search extends Component {
  render() {
    const { musicSearch, isSearchButtonDisabled, bF,
      searchString, searchingFor, searchResults } = this.props;
    return (
      <>
        <Header />
        <div data-testid="page-search" className="container">
          <form>
            <h1>Busque artistas, músicas ou álbums</h1>
            <input
              type="text"
              placeholder="Pesquisar por..."
              name="searchString"
              data-testid="search-artist-input"
              value={ searchString }
              onChange={ musicSearch }
            />
            <br />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ isSearchButtonDisabled }
              onClick={ searchingFor }
            >
              Pesquisar
            </button>
            <h2>
              { (searchResults.length === 0 && bF) && 'Nenhum álbum foi encontrado' }
              { (searchResults.length >= 1 && bF)
              && `Resultado de álbuns de: ${searchString}` }
            </h2>
            <div className="albuns">
              { searchResults.map((each) => (
                <div
                  key={ each.collectionId }
                  className="eachalbum"
                >
                  <img
                    src={ each.artworkUrl100 }
                    alt={ each.collectionName }
                  />
                  <p className="left">
                    { each.artistName }
                    <br />
                    <br />
                    <a
                      href={ `/album/${each.collectionId}` }
                      key={ each.collectionId }
                      data-testid={ `link-to-album-${each.collectionId}` }
                    >
                      { each.collectionName }
                    </a>
                  </p>
                </div>
              ))}
            </div>
          </form>
        </div>
      </>
    );
  }
}

Search.propTypes = {
  isSearchButtonDisabled: teste.bool,
}.isRequired;
