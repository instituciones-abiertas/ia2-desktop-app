import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';

export default function Home() {
  return (
    <div className={styles.container} data-tid="container">
      <div className={styles.content}></div>
      <h2>LIBERAJUS</h2>
      <h5>Anonimizamos para una justicia abierta</h5>
      </div>
  );
}
