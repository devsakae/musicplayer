import React, { Component } from 'react';
import teste from 'prop-types';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

export default class Login extends Component {
  state = {
    loading: false,
  };

  render() {
    const { loading } = this.state;
    const { username, isSaveButtonDisabled,
      onInputChange, onJoinButtonClick } = this.props;
    return (
      <div align="center">
        {/* <Form hidden={ loading }>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nome de usuário</Form.Label>
            <Form.Control
              id="username"
              name="username"
              type="email"
              placeholder="Digite seu nome..."
              value={ username }
              onChange={ onInputChange }
            />
            <Form.Text className="text-muted">
              Digite seu e-mail
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button
            variant="primary"
            type="button"
            disabled={ isSaveButtonDisabled }
            onClick={ onJoinButtonClick }
          >
            Submit
          </Button>
        </Form> */}

        <form hidden={ loading }>
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
              data-testid="login-submit-button"
              disabled={ isSaveButtonDisabled }
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
