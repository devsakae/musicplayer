import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  /* inicializa o componente com username zerado e tela de loading até carregar */
  state = {
    nomelogado: '',
    loading: true,
  };

  /* usa o getUser() pra salvar o nome no localhost e desliga o loading na montagem */
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
        { loading ? <Loading />
          : (
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
              <span data-testid="header-user-name" hidden={ loading }>
                { nomelogado }
              </span>
            </div>
          ) }
      </header>
    );
  }
}
