import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    nomelogado: '',
    loading: true,
  };

  componentDidMount() {
    const logado = async () => {
      const NOME_DE_USUARIO = await getUser();
      this.setState({
        nomelogado: NOME_DE_USUARIO.name,
        loading: false,
      });
    };
    logado();
  }

  render() {
    const { nomelogado, loading } = this.state;
    const sayittrue = true;
    return (
      <header>
        <div className="trybetunes">
          <ul className="menu">
            <li>
              <Link
                to="/search"
                data-testid="link-to-search"
              >
                🔍 Busca
              </Link>
            </li>
            <li>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
              >
                💖 Favoritos
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                data-testid="link-to-profile"
              >
                👤 Meu perfil
              </Link>
            </li>
          </ul>
          <span data-testid="header-user-name">
            { loading ? <Loading notext={ sayittrue } /> : nomelogado }
          </span>
        </div>
      </header>
    );
  }
}
