import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import Card from './Card';
import Header from './Header';
import styles from './Profile.module.css';
import ProfileEdit from './ProfileEdit';

export default class Profile extends Component {
  state = {
    loading: true,
    dadosDoUser: '',
    editarPerfil: false,
  };

  componentDidMount() {
    const getEm = async () => {
      const dadosDoUser = await getUser();
      this.setState({
        loading: false,
        dadosDoUser,
      });
    };
    getEm();
  }

  editarPerfilHandler = (event) => {
    event.preventDefault();
    this.setState({ editarPerfil: true });
  };

  finishEdit = (obj) => {
    this.setState({
      loading: false,
      dadosDoUser: obj,
      editarPerfil: false,
    });
  };

  render() {
    const { loading, dadosDoUser: { name, email, image, description },
      editarPerfil } = this.state;
    return (
      <>
        <Header />
        {loading && <Loading />}
        {!loading && (
          <div className={ styles.profilepage }>
            <h1>Meu perfil</h1>
            <div className={ styles.profilecards }>
              <Card>
                <img src={ image } alt={ name } />
                <legend>
                  Este é você,
                  <strong>
                    {' '}
                    {name}
                  </strong>
                  ?
                </legend>
              </Card>
              <Card>
                { editarPerfil ? <ProfileEdit finishEdit={ this.finishEdit } /> : (
                  <>
                    <button
                      type="button"
                      onClick={ this.editarPerfilHandler }
                    >
                      Editar perfil
                    </button>
                    <ul className={ styles.profile }>
                      <li>
                        Nome:
                        {' '}
                        {name}
                      </li>
                      <li>
                        E-mail:
                        {' '}
                        {email}
                      </li>
                      <li>
                        Sobre você:
                        {' '}
                        {description}
                      </li>
                      <li>
                        Imagem URL:
                        {' '}
                        {image}
                      </li>
                    </ul>
                  </>
                )}
              </Card>
            </div>
          </div>
        )}
      </>
    );
  }
}
