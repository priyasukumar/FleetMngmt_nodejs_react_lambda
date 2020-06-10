import * as React from 'react';
import Bar from '../../core/BarComponent';
import DiscreteSlider from '../shared/DiscreteSliderComponent';
import { IOverSpeedComponentProps } from '../../models/overSpeed';
import CollapsibleTable from '../../core/Table/TableComponent';
import DatePicker from '../../core/DatePicker';
import { Grid } from '@material-ui/core';

const OverSpeedComponent = (props: IOverSpeedComponentProps) => {
  const { leastCrossedDrivers, mostCrossedrivers, discreteSlider, tableData, datePicker } = props;

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Over Speed</h1>
      <DiscreteSlider {...discreteSlider} />
      <Grid container={true} direction="row" justify="space-around" alignItems="center" spacing={2}>
        <Grid item={true} xs={4}>
          <Bar {...mostCrossedrivers} />
        </Grid>
        <Grid item={true} xs={4}>
          <Bar {...leastCrossedDrivers} />
        </Grid>
      </Grid>
      <DatePicker {...datePicker} />
      <CollapsibleTable {...tableData} />
    </>
  );
};

export default OverSpeedComponent;