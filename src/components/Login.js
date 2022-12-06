import React, { Component } from 'react';
import teste from 'prop-types';

export default class Login extends Component {
  render() {
    const { username, onInputChange, onJoinButtonClick } = this.props;
    return (
      <div align="center">
        <form>
          <center>
            <h1>Simple Music Player</h1>
            <h3>by @devsakae</h3>
            <br />
            <br />
            <label htmlFor="username">
              <h3>Digite seu nome para acessar:</h3>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Digite seu nome..."
                value={ username }
                onChange={ onInputChange }
                data-testid="login-name-input"
                className="searchField"
              />
            </label>
            <br />
            <br />
            <button
              type="button"
              onClick={ onJoinButtonClick }
              className="css-button-3d--sky"
            >
              Entrar
            </button>
          </center>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  username: teste.string,
  isSaveButtonDisabled: teste.bool,
  onInputChange: teste.func,
  onJoinButtonClick: teste.func,
}.isRequired;
