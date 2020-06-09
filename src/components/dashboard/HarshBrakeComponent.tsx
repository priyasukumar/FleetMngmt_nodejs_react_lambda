import * as React from 'react';
import Bar from '../../core/BarComponent';
import { IHarshBrakeComponentProps } from '../../models/harshBrake';
import CollapsibleTable from '../../core/Table/TableComponent';
import DatePicker from '../../core/DatePicker';

const HarshBrakeComponent = (props: IHarshBrakeComponentProps) => {
    const { barData, tableData, datePicker } = props;

    return (
        <>
            <Bar plot={barData} title="Harsh Brake" />
            <DatePicker {...datePicker} />
            <CollapsibleTable {...tableData} />
        </>
    );
};

export default HarshBrakeComponent;