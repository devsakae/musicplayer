import React, { Component } from 'react';
import teste from 'prop-types';
import Header from './Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  state = {
    loading: true,
    name: '',
    email: '',
    description: '',
    image: '',
  };

  componentDidMount() {
    const getEm = async () => {
      const { name, email, description, image } = await getUser();
      this.setState({
        loading: false,
        name,
        email,
        description,
        image,
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

  atualizaDados = async (obj) => {
    this.setState({
      loading: true,
    });
    await updateUser(obj);
    this.setState({
      loading: false,
    });
  };

  render() {
    const { loading, isSaveButtonDisabled, name, email, description, image } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-profile-edit">
          { loading ? <Loading /> : (
            <center>
              <h2>
                Bem vind@,
                { ' ' }
                { name }
                .
              </h2>
              <form>
                <input
                  id="edit-input-name"
                  name="name"
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
                  name="email"
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
                  name="image"
                  type="text"
                  data-testid="edit-input-image"
                  placeholder="URL para sua imagem"
                  onChange={ this.onInputChange }
                  value={ image }
                  required
                />
                <br />
                <input
                  id="edit-input-description"
                  type="text"
                  name="description"
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
                  onClick={ () => this.atualizaDados({
                    name, email, description, image }) }
                >
                  Salvar
                </button>
              </form>
            </center>

          )}
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  onInputChange: teste.func,
}.isRequired;
