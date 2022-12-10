import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './Header.css';

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
        <nav>
          <ul className="menu">
            <li>
              <NavLink
                activeClassName={'active'}
                to="/search"
              >
                🔍  Busca
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="active"
                to="/favorites"
              >
                💖  Favoritos
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="active"
                to="/profile"
              >
                👤  Meu perfil
              </NavLink>
            </li>
          </ul>
          <div className="userside">
            { loading ? <Loading notext={ sayittrue } /> : nomelogado }
          </div>
        </nav>
      </header>
    );
  }
}
