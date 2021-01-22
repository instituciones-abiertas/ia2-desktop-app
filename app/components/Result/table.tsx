import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import { useSelector } from 'react-redux';
import { selectAnonymizer } from '../../features/anonymizer/anonymizerSlice';

const useStyles = makeStyles({
  result: {
    fontWeight: 'bold',
  },
});

export default function TableResult() {
  const state = useSelector(selectAnonymizer);
  const classes = useStyles();

  return (
    <Table size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell style={{ fontWeight: 'bold' }}>RESULTADOS</TableCell>
          <TableCell align="right">MODELO </TableCell>
          <TableCell align="right">HUMANO </TableCell>
          <TableCell align="right">EFECTIVIDAD</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {state.resultData.entitiesResult.map((row) => (
          <TableRow key={row.ent}>
            <TableCell scope="row">{row.ent}</TableCell>
            <TableCell align="right" className={classes.result}>
              {row.model_detect}
            </TableCell>
            <TableCell align="right" className={classes.result}>
              {row.human_detect}
            </TableCell>
            <TableCell align="right" className={classes.result}>
              {row.percent} %
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
