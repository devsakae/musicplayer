import React, { Component } from 'react';
import teste from 'prop-types';
import Header from './Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  state = {
    loading: true,
    userData: {},
  };

  componentDidMount() {
    const getEm = async () => {
      const { name, email, description, image } = await getUser();
      this.setState({
        loading: false,
        userData: { name, email, description, image },
        isSaveButtonDisabled: true,
      });
    };
    getEm();
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const DATA_MIN_CHAR = 1;
      this.setState({
        isSaveButtonDisabled: (name.length < DATA_MIN_CHAR),
      });
    });
  };

  render() {
    const { loading, isSaveButtonDisabled,
      userData: { name, email, description, image } } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-profile-edit">
          { loading && <Loading /> }
          <center>
            <p>
              Bem vindo@,
              { ' ' }
              { name }
              .
            </p>
            <form>
              <input
                id="edit-input-name"
                name="edit-input-name"
                type="text"
                data-testid="edit-input-name"
                placeholder={ name }
                value={ name }
                onChange={ this.onInputChange }
                required
              />
              <br />
              <input
                id="edit-input-email"
                name="edit-input-email"
                type="email"
                data-testid="edit-input-email"
                placeholder="Endereço de e-mail"
                value={ email }
                onChange={ this.onInputChange }
                required
              />
              <br />
              <input
                id="edit-input-image"
                name="edit-input-image"
                type="text"
                data-testid="edit-input-image"
                placeholder="URL para sua imagem"
                onChange={ this.onInputChange }
                value={ image }
                required
              />
              <br />
              <textarea
                id="edit-input-description"
                name="edit-input-description"
                placeholder="Algo sobre você, algo bonito."
                value={ description }
                onChange={ this.onInputChange }
                required
              />
              <br />
              <button
                type="button"
                name="edit-button-save"
                data-testid="edit-button-save"
                disabled={ isSaveButtonDisabled }
              >
                Salvar
              </button>
            </form>
          </center>
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  onInputChange: teste.func,
}.isRequired;
