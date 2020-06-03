import * as React from 'react';
import PieChart from '../../core/PieChartComponent';
import { Grid, makeStyles, Theme, createStyles } from '@material-ui/core';
import { IPieData, IBarData, IDashboardProps, IDashboard, IGroupedDashboard, IDashboardModel } from '../../models/dashboard';
import Legend from '../../core/LegendComponent';
import CollapsibleTable from '../../core/Table/TableComponent';
import { groupBy } from '../../utils/database';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);

const getDrivers = (groupedData: IGroupedDashboard): IDashboardModel[] => {
    let drivers = [] as IDashboardModel[];

    for (let key in groupedData) {
        if (key) {
            const dashboardModel = {
                OverSpeed: 0,
                HarshBreaking: 0,
                HarshTurning: 0
            } as IDashboardModel;

            groupedData[key].reduce((c, p) => {
                dashboardModel.DriverId = c.DCS_DriverMaster.DriverId;
                dashboardModel.CreatedDate = c.CreatedDate;
                dashboardModel.DriverMobile = c.DCS_DriverMaster.DriverMobile;
                dashboardModel.DriverName = c.DCS_DriverMaster.DriverName;
                dashboardModel.VehicleLicenseNo = c.DCS_VehicleMaster.VehicleLicenseNo;
                dashboardModel.VehicleName = c.DCS_VehicleMaster.VehicleName;
                dashboardModel.HarshBreaking = dashboardModel.HarshBreaking + c.HarshBreaking + p.HarshBreaking;
                dashboardModel.HarshTurning = dashboardModel.HarshTurning + c.HarshTurning + p.HarshTurning;

                return c;
            });

            drivers.push(dashboardModel);
        }
    }
    return drivers;
};

const DashboardComponent = (props: IDashboardProps) => {
    const classes = useStyles();
    const groupedDataByDriverId = groupBy(props.dashboard, 'DriverVehicleId') as IGroupedDashboard;
    const drivers = getDrivers(groupedDataByDriverId);
    const pieData = [
        { name: '0 - 50', value: 70, color: '#488f31' },
        { name: '50 - 60', value: 20, color: '#ffe03b' },
        { name: '60 - 120', value: 10, color: '#de3e16' },
    ] as IPieData[];

    return (
        <div className={classes.root}>
            <Grid container={true} direction="row" justify="space-around" alignItems="center" spacing={3}>
                <Grid item={true} xs={4}>
                    <PieChart data={pieData} title="Over Speed" />
                </Grid>
                <Grid item={true} xs={4}>
                    <PieChart data={pieData} title="Harsh Brake" />
                </Grid>
                <Grid item={true} xs={4}>
                    <PieChart data={pieData} title="Harsh Turn" />
                </Grid>
            </Grid>
            <Grid container={true} direction="row" justify="space-around" alignItems="center" spacing={3}>
                <Legend data={pieData} />
                <Legend data={pieData} />
                <Legend data={pieData} />
            </Grid>
            <CollapsibleTable data={drivers} />
        </div>
    );
};

export default DashboardComponent;