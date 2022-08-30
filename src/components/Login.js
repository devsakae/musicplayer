import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <div align="center" data-testid="page-login">
        <form>
          <label htmlFor="login">
            Digite seu nome para acessar:
            <br />
            <input
              id="login"
              name="login"
              type="text"
              placeholder="Digite seu nome"
            />
          </label>
        </form>
      </div>
    );
  }
}
