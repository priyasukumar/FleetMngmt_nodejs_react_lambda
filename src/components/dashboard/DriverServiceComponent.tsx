import * as React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, withStyles, Theme, createStyles, TableCell, makeStyles } from '@material-ui/core';
import { IDriverServiceTimeModel } from '../../models/driverServiceTime';

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const DriverServiceComponent = ({ driversServiceTime }: { driversServiceTime: IDriverServiceTimeModel[] }) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Driver Id</StyledTableCell>
                        <StyledTableCell align="left">Driver Name</StyledTableCell>
                        <StyledTableCell align="left">Driver Mobile</StyledTableCell>
                        <StyledTableCell align="left">Resting StartTime</StyledTableCell>
                        <StyledTableCell align="left">Resting EndTime</StyledTableCell>
                        <StyledTableCell align="left">Vehicle Name</StyledTableCell>
                        <StyledTableCell align="left">Vehicle License No</StyledTableCell>
                        <StyledTableCell align="left">Vehicle StartTime</StyledTableCell>
                        <StyledTableCell align="left">Vehicle EndTime</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {driversServiceTime.map((row) => {
                        return (
                            <StyledTableRow key={row.DriverVehicleId}>
                                <StyledTableCell align="left">{row.DriverServiceId}</StyledTableCell>
                                <StyledTableCell align="left">{row.DCS_DriverMaster.DriverName}</StyledTableCell>
                                <StyledTableCell align="left">{row.DCS_DriverMaster.DriverMobile}</StyledTableCell>
                                <StyledTableCell align="left">{row.RestingStartTime}</StyledTableCell>
                                <StyledTableCell align="left">{row.RestingEndTime}</StyledTableCell>
                                <StyledTableCell align="left">{row.DCS_VehicleMaster.VehicleName}</StyledTableCell>
                                <StyledTableCell align="left">{row.DCS_VehicleMaster.VehicleLicenseNo}</StyledTableCell>
                                <StyledTableCell align="left">{row.VehicleStartTime}</StyledTableCell>
                                <StyledTableCell align="left">{row.VehicleEndTime}</StyledTableCell>
                            </StyledTableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DriverServiceComponent;