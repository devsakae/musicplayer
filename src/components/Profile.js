import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import Header from './Header';

export default class Profile extends Component {
  state = {
    loading: true,
    dadosDoUser: '',
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

  render() {
    const { loading, dadosDoUser: { name, email, image, description } } = this.state;
    return (
      <div>
        <Header />
        { loading ? <Loading />
          : (
            <div data-testid="page-profile" className="container">
              <h1>Meu perfil</h1>
              <Link to="/profile/edit">Editar perfil</Link>
              <center>
                <img src={ image } alt={ name } data-testid="profile-image" />
              </center>
              <div className="container">
                <div>
                  Nome:
                  { ' ' }
                  { name }
                </div>
                <div>
                  { description }
                </div>
                <div>
                  E-mail:
                  { ' ' }
                  { email }
                </div>
              </div>
            </div>
          )}
      </div>
    );
  }
}
