import * as React from 'react';
import { IFuelComponentProps } from '../../models/fuelUsage';
import CollapsibleTable from '../../core/Table/FuelUsageTableComponent';
import DatePicker from '../../core/DatePicker';
import { Grid } from '@material-ui/core';

const FuelUsageComponent = (props: IFuelComponentProps) => {
    const { tableData, datePicker } = props;

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Fuel</h1>
            <DatePicker {...datePicker} />
            <Grid container={true} direction="row" justify="space-around" alignItems="center" spacing={2}>
            <Grid item={true} xs={5}>
                <CollapsibleTable {...tableData} />
            </Grid>
            <Grid item={true} xs={5}>
             MAP
            </Grid>
            <Grid item={true} xs={10}>
                CHART
            </Grid>
            </Grid>
        </>
    );
}; 

export default FuelUsageComponent;