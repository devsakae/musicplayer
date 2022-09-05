import React, { Component } from 'react';
import teste from 'prop-types';

export default class Login extends Component {
  state = {
    loading: false,
  };

  render() {
    const { loading } = this.state;
    const { username, isSaveButtonDisabled,
      onInputChange, onJoinButtonClick } = this.props;
    return (
      <div align="center" data-testid="page-login">
        <form hidden={ loading }>
          <center>
            <h1>TrybeTunes, by @devsakae</h1>
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
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ isSaveButtonDisabled }
              onClick={ onJoinButtonClick }
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
