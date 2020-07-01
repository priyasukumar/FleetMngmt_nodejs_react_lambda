import * as React from 'react';
import Bar from '../../core/BarComponent';
import { IHarshTurnComponentProps } from '../../models/harshTurn';
import CollapsibleTable from '../../core/Table/TableComponent';
import DatePicker from '../../core/DatePicker';
import { Grid } from '@material-ui/core';

const HarshTurnComponent = (props: IHarshTurnComponentProps) => {
  const { mostAppliedDrivers, leastAppliedDrivers, tableData, datePicker } = props;

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Harsh Turn</h1>
      <Grid container={true} direction="row" justify="space-around" alignItems="center" spacing={2}>
        <Grid item={true} xs={5}>
          <Bar {...mostAppliedDrivers} />
        </Grid>
        <Grid item={true} xs={5}>
          <Bar {...leastAppliedDrivers} />
        </Grid>
      </Grid>
      <DatePicker {...datePicker} />
      <CollapsibleTable {...tableData} />
    </>
  );
};

export default HarshTurnComponent;