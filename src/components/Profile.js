import React, { Component } from 'react';
import Header from './Header';

export default class Profile extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile" className="container">
          <h1>Meu perfil</h1>
        </div>
      </>
    );
  }
}
