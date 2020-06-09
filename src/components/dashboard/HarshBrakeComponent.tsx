import * as React from 'react';
import Bar from '../../core/BarComponent';
import { IHarshBrakeComponentProps } from '../../models/harshBrake';
import CollapsibleTable from '../../core/Table/TableComponent';
import DatePicker from '../../core/DatePicker';
import { makeStyles, Theme, createStyles, Grid, Paper, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            height: 140,
            width: 100,
        },
        control: {
            padding: theme.spacing(10),
        },
    }),
);

const HarshBrakeComponent = (props: IHarshBrakeComponentProps) => {
    const classes = useStyles();
    const { leastAppliedDrivers, mostAppliedDrivers, tableData, datePicker } = props;

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Harsh Brake</h1>
            <Grid container={true} direction="row" justify="space-around" alignItems="center" spacing={2}>
                <Grid item={true} xs={4}>
                    <Bar {...leastAppliedDrivers} />
                </Grid>
                <Grid item={true} xs={4}>
                    <Bar {...mostAppliedDrivers} />
                </Grid>
            </Grid>

            <DatePicker {...datePicker} />
            <CollapsibleTable {...tableData} />
        </>
    );
};

export default HarshBrakeComponent;