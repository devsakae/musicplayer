import React, { Component } from 'react';
import teste from 'prop-types';
import Header from './Header';

export default class Search extends Component {
  render() {
    const { musicSearch, isSearchButtonDisabled, searchString } = this.props;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <form>
            <center>
              <h1>Busque artistas, músicas ou álbums</h1>
              <input
                type="text"
                placeholder="Pesquisar por..."
                min="2"
                name="searchString"
                data-testid="search-artist-input"
                value={ searchString }
                onChange={ musicSearch }
              />
              <br />
              <br />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ isSearchButtonDisabled }
              >
                Pesquisar
              </button>
            </center>
          </form>
        </div>
      </>
    );
  }
}

Search.propTypes = {
  isSearchButtonDisabled: teste.bool,
}.isRequired;
