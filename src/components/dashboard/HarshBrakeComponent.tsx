import * as React from 'react';
import Bar from '../../core/BarComponent';
import { IHarshBrakeComponentProps } from '../../models/harshBrake';
import CollapsibleTable from '../../core/Table/TableComponent';
import DatePicker from '../../core/DatePicker';

const HarshBrakeComponent = (props: IHarshBrakeComponentProps) => {
    const { barData, tableData, datePicker } = props;

    return (
        <>
            <Bar data={barData} title="No. of Persons" />
            <DatePicker {...datePicker} />
            <CollapsibleTable {...tableData} />
        </>
    );
};

export default HarshBrakeComponent;