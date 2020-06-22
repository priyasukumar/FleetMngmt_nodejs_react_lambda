import * as React from 'react';
import { IDriverServiceTimeComponentProps } from '../../models/driverServiceTime';
import CollapsibleTable from '../../core/Table/TableComponent';
import DatePicker from '../../core/DatePicker';
import { Grid } from '@material-ui/core';
import Bar from '../../core/BarComponent';
const DriverServiceComponent = (props: IDriverServiceTimeComponentProps) => {
    const { mostDrivingDrivers, leastDrivingDrivers, tableData, datePicker } = props;

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Driver Service</h1>
            <Grid container={true} direction="row" justify="space-around" alignItems="center" spacing={2}>
                <Grid item={true} xs={4}>
                    <Bar {...mostDrivingDrivers} />
                </Grid>
                <Grid item={true} xs={4}>
                    <Bar {...leastDrivingDrivers} />
                </Grid>
            </Grid>
            <DatePicker {...datePicker} />
            <CollapsibleTable {...tableData} />
        </>
    );
};

export default DriverServiceComponent;