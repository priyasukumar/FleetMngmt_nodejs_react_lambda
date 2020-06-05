import React from 'react';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Moment from 'moment';
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
import { ICollapsibleTableProps, IRowProps, IHeaderProps, IDashboardModel, IDashboardSubModel } from '../../models/dashboard';
import { IDriverServiceTimeModel, IDriverServiceTimeSubModel } from '../../models/driverServiceTime';
import { isDashboard } from '../../containers/DashboardContainer';
import Bar from '../../core/BarComponent';

const dateFormat = 'd/MM/YY HH:mm:ss A';
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#1976d2',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const Header = (props: IHeaderProps) => {
  const { headers } = props;
  return (
    <TableHead>
      <TableRow>
        <StyledTableCell />
        {
          headers.map((header, index) => <StyledTableCell key={index} align="left">{header}</StyledTableCell>)
        }
      </TableRow>
    </TableHead>
  );
};

const Row = (rowProps: IRowProps) => {
  const { data, driverCondition, barData } = rowProps;
  let dashboardModel = data as IDashboardModel;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <StyledTableRow className={classes.root}>
        <StyledTableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        </StyledTableCell>

        <StyledTableCell component="th" scope="row">
          {dashboardModel.DriverId}
        </StyledTableCell>
        <StyledTableCell align="left">{dashboardModel.DriverName}</StyledTableCell>
        <StyledTableCell align="left">{dashboardModel.DriverMobile}</StyledTableCell>
        <StyledTableCell align="left">{dashboardModel.VehicleName}</StyledTableCell>
        <StyledTableCell align="left">{dashboardModel.VehicleLicenseNo}</StyledTableCell>
        {
          driverCondition.includeOverSpeed && <StyledTableCell align="center">{dashboardModel.OverSpeed}</StyledTableCell>
        }
        {
          driverCondition.includeHarshBrake && <StyledTableCell align="center">{dashboardModel.HarshBreaking}</StyledTableCell>
        }
        {
          driverCondition.includeHarshTurn && <StyledTableCell align="center">{dashboardModel.HarshTurning}</StyledTableCell>
        }
      </StyledTableRow >
      <StyledTableRow >
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit={true}>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom={true} component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <StyledTableRow >
                    {
                      driverCondition.includeHarshBrake && <StyledTableCell align="center">Harsh Breaking</StyledTableCell>
                    }
                    {
                      driverCondition.includeHarshTurn && <StyledTableCell align="center">Harsh Turning</StyledTableCell>
                    }
                    {
                      driverCondition.includeOverSpeed && <StyledTableCell align="center">Vehicle Speed</StyledTableCell>
                    }
                    <StyledTableCell align="center">Packet Time</StyledTableCell>
                  </StyledTableRow >
                </TableHead>
                <TableBody>
                  {(dashboardModel.SubModel as Array<IDashboardSubModel>).map((subRow, index) => (
                    <StyledTableRow key={index}>
                      {
                        driverCondition.includeHarshBrake && <StyledTableCell align="center">{subRow.HarshBreaking}</StyledTableCell>
                      }
                      {
                        driverCondition.includeHarshTurn && <StyledTableCell align="center">{subRow.HarshTurning}</StyledTableCell>
                      }
                      {
                        driverCondition.includeOverSpeed && <StyledTableCell align="center">{subRow.VehicleSpeed}</StyledTableCell>
                      }
                      <StyledTableCell align="center">{subRow.PacketTime}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
              {/* <Bar data={barData} title="No. of Persons" /> */}
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow >
    </React.Fragment>
  );
};

const SRow = (rowProps: IRowProps) => {
  const { data, driverCondition } = rowProps;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <StyledTableRow className={classes.root}>
        <StyledTableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        </StyledTableCell>

        <StyledTableCell component="th" scope="row">
          {data.DriverId}
        </StyledTableCell>
        <StyledTableCell align="left">{data.DriverName}</StyledTableCell>
        <StyledTableCell align="left">{data.DriverMobile}</StyledTableCell>
        <StyledTableCell align="left">{data.VehicleName}</StyledTableCell>
        <StyledTableCell align="left">{data.VehicleLicenseNo}</StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit={true}>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom={true} component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell align="center">Resting StartTime</StyledTableCell>
                    <StyledTableCell align="center">Resting EndTime</StyledTableCell>
                    <StyledTableCell align="center">Vehicle StartTime</StyledTableCell>
                    <StyledTableCell align="center">Vehicle EndTime</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {
                    (data.SubModel as Array<IDriverServiceTimeSubModel>).map((subRow, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell align="center">{subRow.RestingStartTime}</StyledTableCell>
                        <StyledTableCell align="center">{subRow.RestingEndTime}</StyledTableCell>
                        <StyledTableCell align="center">{subRow.VehicleStartTime}</StyledTableCell>
                        <StyledTableCell align="center">{subRow.VehicleEndTime}</StyledTableCell>
                      </StyledTableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </React.Fragment>
  );
};

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const CollapsibleTable = (props: ICollapsibleTableProps) => {
  const { driverCondition, headers, barData } = props;
  const classes = useRowStyles();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <Header headers={headers} />
        <TableBody>
          {
            (isDashboard(props.data[0])) &&
            (props.data as Array<IDashboardModel>).map((driver: IDashboardModel, index: number): JSX.Element => {
              // driver.SubModel.map(c => {
              //   c.PacketTime = Moment(c.PacketTime).format(dateFormat);

              //   return c;
              // });

              const rowProps = {
                data: driver as IDashboardModel,
                driverCondition,
                barData
              } as IRowProps;
              return (<Row key={index} {...rowProps} />);
            })
          }
          {
            (!isDashboard(props.data[0])) &&
            (props.data as Array<IDriverServiceTimeModel>).map((driverService, index) => {
              // driverService.SubModel.map(c => {
              //   c.RestingStartTime = Moment(c.RestingStartTime).format(dateFormat);
              //   c.RestingEndTime = Moment(c.RestingEndTime).format(dateFormat);
              //   c.VehicleStartTime = Moment(c.VehicleStartTime).format(dateFormat);
              //   c.VehicleEndTime = Moment(c.VehicleEndTime).format(dateFormat);

              //   return c;
              // });
              const rowProps = {
                data: driverService,
                driverCondition
              } as IRowProps;
              return (<SRow key={index} {...rowProps} />);
            })
          }
          {
            props.data.length === 0 &&
            <StyledTableRow className={classes.root}>
              <StyledTableCell component="th" scope="row" style={{ textAlign: 'center' }} colSpan={10}>No Data Available</StyledTableCell>
            </StyledTableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleTable;
