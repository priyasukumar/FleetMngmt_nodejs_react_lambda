import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export interface ITableHeaderProps {
    headers: string[];
}

const TableHeaderComponent = (props: ITableHeaderProps) => {
    const { headers } = props;
    return (
        <TableHead>
            <TableRow>
                <TableCell />
                {
                    headers.map(header => <TableCell key={header} align="right">{header}</TableCell>)
                }
            </TableRow>
        </TableHead>
    );
};

export default TableHeaderComponent;
