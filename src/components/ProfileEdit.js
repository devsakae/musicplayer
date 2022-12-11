import React, { Component } from 'react';
import teste from 'prop-types';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';
import styles from './Profile.module.css';

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
    const { finishEdit } = this.props;
    this.setState({
      loading: true,
    });
    await updateUser(obj);
    this.setState({
      loading: false,
    });
    finishEdit(obj);
  };

  render() {
    const { loading, isSaveButtonDisabled, name, email, description, image } = this.state;
    return (
      <>
        { loading && <Loading /> }
        { !loading && (
          <form className={ styles.profileedit }>
            <label htmlFor="edit-input-name">
              Nome:
              <input
                id="edit-input-name"
                name="name"
                type="text"
                placeholder={ name }
                value={ name }
                onChange={ this.onInputChange }
                required
              />
            </label>

            <label htmlFor="edit-input-email">
              E-mail:
              <input
                id="edit-input-email"
                name="email"
                type="email"
                placeholder="Endereço de e-mail"
                value={ email }
                onChange={ this.onInputChange }
                required
              />
            </label>

            <label htmlFor="edit-input-image">
              Imagem URL:
              <input
                id="edit-input-image"
                name="image"
                type="text"
                placeholder="URL para sua imagem"
                onChange={ this.onInputChange }
                value={ image }
                required
              />
            </label>

            <label htmlFor="edit-input-description">
              Descrição:
              <input
                id="edit-input-description"
                type="text"
                name="description"
                placeholder="Algo sobre você, algo bonito."
                value={ description }
                onChange={ this.onInputChange }
                required
              />
            </label>

            <button
              type="button"
              name="edit-button-save"
              disabled={ isSaveButtonDisabled }
              onClick={ () => this.atualizaDados({
                name, email, description, image }) }
            >
              Salvar
            </button>
          </form>
        )}
      </>
    );
  }
}

ProfileEdit.propTypes = {
  onInputChange: teste.func,
}.isRequired;
