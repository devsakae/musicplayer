import React, { Component } from 'react';
import teste from 'prop-types';

export default class Login extends Component {
  render() {
    const { username, isSaveButtonDisabled,
      onInputChange, onJoinButtonClick } = this.props;
    return (
      <div align="center" data-testid="page-login">
        <form>
          <label htmlFor="username">
            Digite seu nome para acessar:
            <br />
            <input
              id="username"
              name="username"
              type="text"
              value={ username }
              onChange={ onInputChange }
              data-testid="login-name-input"
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isSaveButtonDisabled }
            onClick={ onJoinButtonClick }
          >
            Entrar
          </button>
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
