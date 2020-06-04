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
import { ICollapsibleTableProps, IRowProps, IHeaderProps, IDashboardModel, IDashboardSubModel } from '../../models/dashboard';
import { IDriverServiceTimeModel, IDriverServiceTimeSubModel } from '../../models/driverServiceTime';
import { isDashboard } from '../../containers/DashboardContainer';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const Header = (props: IHeaderProps) => {
  const { headers } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell />
        {
          headers.map((header, index) => <TableCell key={index} align="left">{header}</TableCell>)
        }
      </TableRow>
    </TableHead>
  );
};

const Row = (rowProps: IRowProps) => {
  const { data, driverCondition } = rowProps;
  let dashboardModel = data as IDashboardModel;
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
          {dashboardModel.DriverId}
        </TableCell>
        <TableCell align="left">{dashboardModel.DriverName}</TableCell>
        <TableCell align="left">{dashboardModel.DriverMobile}</TableCell>
        <TableCell align="left">{dashboardModel.VehicleName}</TableCell>
        <TableCell align="left">{dashboardModel.VehicleLicenseNo}</TableCell>
        {
          driverCondition.includeOverSpeed && <TableCell align="left">{dashboardModel.OverSpeed}</TableCell>
        }
        {
          driverCondition.includeHarshBrake && <TableCell align="left">{dashboardModel.HarshBreaking}</TableCell>
        }
        {
          driverCondition.includeHarshTurn && <TableCell align="left">{dashboardModel.HarshTurning}</TableCell>
        }
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit={true}>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom={true} component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {
                      driverCondition.includeHarshBrake && <TableCell align="center">Harsh Breaking</TableCell>
                    }
                    {
                      driverCondition.includeHarshTurn && <TableCell align="center">Harsh Turning</TableCell>
                    }
                    {
                      driverCondition.includeOverSpeed && <TableCell align="center">Vehicle Speed</TableCell>
                    }
                    <TableCell align="center">Packet Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(dashboardModel.SubModel as Array<IDashboardSubModel>).map((subRow, index) => (
                    <TableRow key={index}>
                      {
                        driverCondition.includeHarshBrake && <TableCell align="center">{subRow.HarshBreaking}</TableCell>
                      }
                      {
                        driverCondition.includeHarshTurn && <TableCell align="center">{subRow.HarshTurning}</TableCell>
                      }
                      {
                        driverCondition.includeOverSpeed && <TableCell align="center">{subRow.VehicleSpeed}</TableCell>
                      }
                      <TableCell align="center">{subRow.PacketTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const SRow = (rowProps: IRowProps) => {
  const { data, driverCondition } = rowProps;
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
          {data.DriverId}
        </TableCell>
        <TableCell align="left">{data.DriverName}</TableCell>
        <TableCell align="left">{data.DriverMobile}</TableCell>
        <TableCell align="left">{data.VehicleName}</TableCell>
        <TableCell align="left">{data.VehicleLicenseNo}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit={true}>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom={true} component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Resting StartTime</TableCell>
                    <TableCell align="center">Resting EndTime</TableCell>
                    <TableCell align="center">Vehicle StartTime</TableCell>
                    <TableCell align="center">Vehicle EndTime</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    (data.SubModel as Array<IDriverServiceTimeSubModel>).map((subRow, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{subRow.RestingStartTime}</TableCell>
                        <TableCell align="center">{subRow.RestingEndTime}</TableCell>
                        <TableCell align="center">{subRow.VehicleStartTime}</TableCell>
                        <TableCell align="center">{subRow.VehicleEndTime}</TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const CollapsibleTable = (props: ICollapsibleTableProps) => {
  const { driverCondition, headers } = props;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <Header headers={headers} />
        <TableBody>
          {
            (isDashboard(props.data[0])) &&
            (props.data as Array<IDashboardModel>).map((driver: IDashboardModel, index: number): JSX.Element => {
              const rowProps = {
                data: driver as IDashboardModel,
                driverCondition
              } as IRowProps;
              return (<Row key={index} {...rowProps} />);
            })
          }
          {
            (!isDashboard(props.data[0])) &&
            (props.data as Array<IDriverServiceTimeModel>).map((driver, index) => {
              const rowProps = {
                data: driver,
                driverCondition
              } as IRowProps;
              return (<SRow key={index} {...rowProps} />);
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleTable;
