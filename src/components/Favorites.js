import React, { Component } from 'react';
import Loading from './Loading';

export default class Favorites extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        { loading ? <Loading />
          : (
            <div data-testid="page-favorites" className="container">
              <h1>Favoritas</h1>
            </div>
          ) }
      </div>
    );
  }
}
