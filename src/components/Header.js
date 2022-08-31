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
    return (
      <header data-testid="header-component">
        { loading && <Loading /> }
        <div className="trybetunes" hidden={ loading }>
          <ul className="menu">
            <li><Link to="/search" data-testid="link-to-search">Busca</Link></li>
            <li><Link to="/favorites" data-testid="link-to-favorites">Favs</Link></li>
            <li><Link to="/profile" data-testid="link-to-profile"> Meu perfil</Link></li>
          </ul>
          <div data-testid="header-user-name">
            { nomelogado }
          </div>
        </div>
      </header>
    );
  }
}
