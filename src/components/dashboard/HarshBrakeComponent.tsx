import * as React from 'react';
import Bar from '../../core/BarComponent';
import { IHarshBrakeComponentProps } from '../../models/harshBrake';
import CollapsibleTable from '../../core/Table/TableComponent';

const HarshBrakeComponent = (props: IHarshBrakeComponentProps) => {
    const { barData, tableData } = props;

    return (
        <>
            <Bar data={barData} title="No. of Persons" />
            <CollapsibleTable {...tableData} />
        </>
    );
};

export default HarshBrakeComponent;