import React from 'react';
import { Button, Col, Row, Image } from 'react-bootstrap'; 
import styles from './Home.css';

export default function Home() {
  return (
    <div className={styles.container} data-tid="container">
      <div className={styles.content}></div>
        <Row><Image width="80px" src="./assets/documentIcon.png"/></Row>
        <Row className={styles.textRow}>
        </Row>
          <h2>LIBERAJUS</h2>
        <Row className={styles.textRow}>
          <h5>Anonimizamos para una justicia abierta</h5>
        </Row>
        <Row className={styles.buttonsRow}>
         <Col>
           <Button variant="secondary" size="lg" className={styles.firstButton}>
              ANÁLISIS
          </Button>
        </Col>
        <Col>
        <Button variant="secondary" size="lg" className={styles.secondButton}>
          ANONIMIZAR
        </Button>
        </Col>
        </Row>
        <Row className={styles.bottomRow}>
        <h6>Desarrollado por Cambá</h6>
      </Row>
      </div>
  );
}
