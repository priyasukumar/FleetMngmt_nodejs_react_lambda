import * as React from 'react';
import Bar from '../../core/BarComponent';
import { IHarshTurnComponentProps } from '../../models/harshTurn';
import CollapsibleTable from '../../core/Table/TableComponent';
import DatePicker from '../../core/DatePicker';

const HarshTurnComponent = (props: IHarshTurnComponentProps) => {
  const { barData, tableData, datePicker } = props;

  return (
    <>
      <Bar data={barData} title="No. of Persons" />
      <DatePicker {...datePicker} />
      <CollapsibleTable {...tableData} />
    </>
  );
};

export default HarshTurnComponent;