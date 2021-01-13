import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import styles from './Home.css';
import routes from '../../constants/routes.json';
import logoImage from '../../assets/img/logo.png';
import { updateReset } from '../../features/anonymizer/anonymizerSlice';

export default function Home() {
  const dispatch = useDispatch();
  const handleReset = () => {
    dispatch(updateReset());
  };
  return (
    <div className={styles.container}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item>
          <img className={styles.logo} alt="logo" src={logoImage} />
        </Grid>
        <Grid item>
          <h5 className={styles.contentDescription}>
            Anonimizamos para una justicia abierta
          </h5>
        </Grid>
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <Link to={routes.LOGIN}>
              <Button
                color="primary"
                variant="contained"
                size="medium"
                className={styles.button}
                onClick={handleReset}
                style={{
                  backgroundColor: 'primary',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                ANONIMIZAR
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item sm={2} xs={6}>
            <h6 className={styles.footer}>Desarrollado por Cambá</h6>
          </Grid>
          {/* <Grid item sm={1} xs={6}>
            <img
              src={logoFooter}
              className={styles.logoFooter}
              alt="logo-footer"
            />
          </Grid> */}
        </Grid>
      </Grid>
    </div>
  );
}
