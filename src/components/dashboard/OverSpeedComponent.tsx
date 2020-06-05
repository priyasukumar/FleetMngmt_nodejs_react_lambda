import * as React from 'react';
import Bar from '../../core/BarComponent';
import DiscreteSlider from '../shared/DiscreteSliderComponent';
import { IOverSpeedComponentProps } from '../../models/overSpeed';
import CollapsibleTable from '../../core/Table/TableComponent';
import DatePicker from '../../core/DatePicker';

const OverSpeedComponent = (props: IOverSpeedComponentProps) => {
  const { barData, discreteSlider, tableData } = props;
  
  return (
    <>
      <DiscreteSlider {...discreteSlider} />
      <Bar data={barData} title="No. of Persons" />
      <DatePicker />
      <CollapsibleTable {...tableData} />
    </>
  );
};

export default OverSpeedComponent;