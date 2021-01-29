import React, { useEffect } from 'react';
import { Box, Container, LinearProgress } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { updateErrorStatus } from '../../features/anonymizer/anonymizerSlice';

export default function Loader() {
  const dispatch = useDispatch();

  useEffect(() => {
    const time = setTimeout(() => {
      dispatch(updateErrorStatus({ status: true }));
    }, 200000);

    return () => {
      clearTimeout(time);
    };
  }, [dispatch]);

  return (
    <Container maxWidth="md">
      <Box m={25}>
        <LinearProgress color="primary" />
      </Box>
    </Container>
  );
}
