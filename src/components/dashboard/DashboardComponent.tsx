import * as React from 'react';
import PieChart from '../../core/PieChartComponent';
import { Grid, makeStyles, Theme, createStyles } from '@material-ui/core';
import { IDashboardComponentProps } from '../../models/dashboard';
import Legend from '../../core/LegendComponent';
import CollapsibleTable from '../../core/Table/TableComponent';
import DatePicker from '../../core/DatePicker';
import { Suspense } from 'react';

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
    const { graphData, tableData, datePicker } = props;

    return (
        <div className={classes.root}>
            <Suspense fallback={<div>Loading...</div>}>
                <section>
                    <Grid container={true} direction="row" justify="space-around" alignItems="center" spacing={2}>
                        <Grid item={true} xs={4}>
                            <PieChart plot={graphData} title="Over All" />
                        </Grid>
                        <Grid item={true} xs={4}>
                            <Legend data={graphData} />
                        </Grid>
                    </Grid>
                    <DatePicker {...datePicker} />
                    <CollapsibleTable {...tableData} />
                </section>
            </Suspense>
        </div>
    );
};

export default DashboardComponent;