import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { ICollapsibleTableProps, IRowProps } from '../../models/dashboard';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const Row = (row: IRowProps) => {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.data.DriverId}
        </TableCell>
        <TableCell align="left">{row.data.DriverName}</TableCell>
        <TableCell align="left">{row.data.DriverMobile}</TableCell>
        <TableCell align="left">{row.data.VehicleName}</TableCell>
        <TableCell align="left">{row.data.VehicleLicenseNo}</TableCell>
        <TableCell align="left">{row.data.OverSpeed}</TableCell>
        <TableCell align="left">{row.data.HarshBreaking}</TableCell>
        <TableCell align="left">{row.data.HarshTurning}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit={true}>
            <Box margin={1}>
              {/* <Typography variant="h6" gutterBottom={true} component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table> */}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const CollapsibleTable = (props: ICollapsibleTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Driver Id</TableCell>
            <TableCell align="left">Driver Name</TableCell>
            <TableCell align="left">Driver Mobile</TableCell>
            <TableCell align="left">Vehicle Name</TableCell>
            <TableCell align="left">Vehicle License No</TableCell>
            <TableCell align="left">Over Speed</TableCell>
            <TableCell align="left">Harsh Break</TableCell>
            <TableCell align="left">Harsh Turn</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.data.map((driver, index) => {
              const rowProps: IRowProps = {
                data: driver
              } as IRowProps;
              return (<Row key={index} {...rowProps} />);
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleTable;
