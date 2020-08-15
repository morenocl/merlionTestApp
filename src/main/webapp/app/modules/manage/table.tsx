import React from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';

type ElemList = {
  id: number,
  state: string
}

type TableProps = {
  list: ElemList[],
  state: string,
  update: (id: number, nextState: string) => void
};

export default function ProductTable(props: TableProps) {
  const { list, state, update } = props

  const button = {
    'IN_CHARGE': 'Enviar',
    'SHIPPED': 'Entregar',
  }

  const next = {
    'IN_CHARGE': 'SHIPPED',
    'SHIPPED': 'DELIVERED',
  }

  const makeOnClick = (id: number, nextState: string) => () => update(id, nextState)

  const buttonStyle = {
    background:'#2a6a9e',
    color:'#EBEBEB'
  }

  const filteredList = list.map((row: ElemList) => (
    state === row.state &&
    <TableRow key={row.id}>
      <TableCell align="center">
        {row.id}
      </TableCell>
      <TableCell align="center" component="th" scope="row">
        {row.state}
      </TableCell>
      <TableCell align="right">
        {!!next[state] &&
          <Button
            variant="contained"
            style={buttonStyle}
            onClick={makeOnClick(row.id, next[state])}
          >
            {button[state]}
          </Button>}
      </TableCell>
    </TableRow>
  ))

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Id</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredList}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
