import * as React from 'react';
import { IDriverServiceTimeComponentProps } from '../../models/driverServiceTime';
import CollapsibleTable from '../../core/Table/TableComponent';
import DatePicker from '../../core/DatePicker';

const DriverServiceComponent = (props: IDriverServiceTimeComponentProps) => {
    const { tableData, datePicker } = props;

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Driver Service</h1>
            <DatePicker {...datePicker} />
            <CollapsibleTable {...tableData} />
        </>
    );
};

export default DriverServiceComponent;