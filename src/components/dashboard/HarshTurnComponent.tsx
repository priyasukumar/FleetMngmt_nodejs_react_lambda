import * as React from 'react';
import Bar from '../../core/BarComponent';
import { IHarshTurnComponentProps } from '../../models/harshTurn';
import CollapsibleTable from '../../core/Table/TableComponent';

const HarshTurnComponent = (props: IHarshTurnComponentProps) => {
  const { barData, tableData } = props;

  return (
    <>
      <Bar data={barData} title="No. of Persons" />
      <CollapsibleTable {...tableData} />
    </>
  );
};

export default HarshTurnComponent;