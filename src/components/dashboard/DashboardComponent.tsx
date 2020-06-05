import * as React from 'react';
import PieChart from '../../core/PieChartComponent';
import { Grid, makeStyles, Theme, createStyles } from '@material-ui/core';
import { IDashboardComponentProps } from '../../models/dashboard';
import Legend from '../../core/LegendComponent';
import CollapsibleTable from '../../core/Table/TableComponent';
import DatePicker from '../../core/DatePicker';

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

const DashboardComponent = (props: IDashboardComponentProps) => {
    const classes = useStyles();
    const { graphData, tableData } = props;

    return (
        <div className={classes.root}>
            <Grid container={true} direction="row" justify="space-around" alignItems="center" spacing={3}>
                <Grid item={true} xs={4}>
                    <PieChart data={graphData} title="Over Speed" />
                </Grid>
                <Grid item={true} xs={4}>
                    <PieChart data={graphData} title="Harsh Brake" />
                </Grid>
                <Grid item={true} xs={4}>
                    <PieChart data={graphData} title="Harsh Turn" />
                </Grid>
            </Grid>
            <Grid container={true} direction="row" justify="space-around" alignItems="center" spacing={3}>
                <Legend data={graphData} />
                <Legend data={graphData} />
                <Legend data={graphData} />
            </Grid>
            <DatePicker />
            <CollapsibleTable {...tableData} />
        </div>
    );
};

export default DashboardComponent;