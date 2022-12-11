import React from 'react';
import teste from 'prop-types';
import styles from './Card.module.css';

function Card(props) {
  const { children } = props;
  return (
    <div className={ styles.card }>{ children }</div>
  );
}

Card.propTypes = {
  children: teste.shape({}),
}.isRequired;

export default Card;
