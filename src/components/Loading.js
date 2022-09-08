import React, { Component } from 'react';
import './Loading.css';
import teste from 'prop-types';

export default class Loading extends Component {
  render() {
    const { notext, addclass } = this.props;
    return (
      <div className={ addclass }>
        <div className="container">
          <div hidden={ notext }>Carregando...</div>
          <div className="loading">
            <span className="loadspan0">♩</span>
            <span className="loadspan1">♩</span>
            <span className="loadspan2">♩</span>
            <span className="loadspan3">♩</span>
            <span className="loadspan4">♩</span>
          </div>
        </div>
      </div>
    );
  }
}

Loading.propTypes = {
  notext: teste.bool,
}.isRequired;
