import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import teste from 'prop-types';
import Loading from './Loading';
import Header from './Header';

export default class Search extends Component {
  render() {
    const { musicSearch, isSearchButtonDisabled, bF,
      searchString, searchingFor, searchResults,
      loading, lastSearch } = this.props;
    return (
      <div>
        <Header />
        { loading ? <Loading />
          : (
            <div data-testid="page-search" className="container">
              <form>
                <h1>Busque artistas, músicas ou álbums</h1>
                <input
                  type="text"
                  placeholder="Pesquise por nome do artista"
                  name="searchString"
                  data-testid="search-artist-input"
                  value={ searchString }
                  onChange={ musicSearch }
                  className="searchField"
                />
                <br />
                <br />
                <button
                  type="button"
                  data-testid="search-artist-button"
                  disabled={ isSearchButtonDisabled }
                  onClick={ searchingFor }
                  className="css-button-3d--sky"
                >
                  Pesquisar
                </button>
              </form>
            </div>
          )}
        <h1>
          { (searchResults.length === 0 && bF) && 'Nenhum álbum foi encontrado' }
          { (searchResults.length >= 1 && bF)
          && `Resultado de álbuns de: ${lastSearch}` }
        </h1>
        <div className="albuns">
          { searchResults.map((each) => (
            <Link
              to={ `/album/${each.collectionId}` }
              key={ each.collectionId }
              data-testid={ `link-to-album-${each.collectionId}` }
            >
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
                  { each.collectionName }
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  isSearchButtonDisabled: teste.bool,
}.isRequired;
