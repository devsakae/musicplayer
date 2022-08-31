import React, { Component } from 'react';
import Header from './Header';

export default class Search extends Component {
  render() {
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
                min="1"
              />
            </center>
          </form>
        </div>
      </>
    );
  }
}
