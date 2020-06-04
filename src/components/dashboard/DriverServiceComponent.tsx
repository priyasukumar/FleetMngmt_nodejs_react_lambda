import * as React from 'react';
import { IDriverServiceTimeComponentProps } from '../../models/driverServiceTime';
import CollapsibleTable from '../../core/Table/TableComponent';

const DriverServiceComponent = (props: IDriverServiceTimeComponentProps) => {
    const { tableData } = props;

    return (
        <CollapsibleTable {...tableData} />
    );
};

export default DriverServiceComponent;