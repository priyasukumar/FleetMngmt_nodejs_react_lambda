import React from 'react';
import { IFuelComponentProps } from '../../models/fuelUsage';
import CollapsibleTable from '../../core/Table/FuelUsageTableComponent';
import DatePicker from '../../core/DatePicker';
import { Grid } from '@material-ui/core';
import FuelChartComponent from '../../core/FuelChartComponent';

const FuelUsageComponent = (props: IFuelComponentProps) => {
    const { tableData, datePicker, fuelData } = props;

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Fuel Usage</h1>
            <DatePicker {...datePicker} />
            <Grid container={true} direction="row" justify="space-around" alignItems="center" spacing={2}>
            <Grid item={true} xs={5}>
                <CollapsibleTable {...tableData} />
            </Grid>
            <Grid item={true} xs={5}>
                {
                    props.fuelData.fuel.FuelInfoModel ?
                    <FuelChartComponent {...fuelData} /> 
                    : null
                }  
            </Grid>
            <Grid item={true} xs={10}>
                    MAP
            </Grid>
           
            </Grid>
        </>
    );
}; 

export default FuelUsageComponent;