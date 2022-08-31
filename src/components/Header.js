import React, { Component } from 'react';
import teste from 'prop-types';

export default class Header extends Component {
  render() {
    const { username } = this.props;
    return (
      <header>
        <div className="trybetunes" />
        <div>{`Olá, ${username}`}</div>
      </header>
    );
  }
}

Header.propTypes = {
  username: teste.string,
}.isRequired;
