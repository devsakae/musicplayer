import React, { Component } from 'react';
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
        <div className="trybetunes" />
        { loading && <Loading /> }
        <div>
          <p>
            Olá,
            <span data-testid="header-user-name">{ nomelogado }</span>
          </p>
        </div>
      </header>
    );
  }
}
