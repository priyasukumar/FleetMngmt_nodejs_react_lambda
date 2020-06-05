import * as React from 'react';
import { connect } from 'react-redux';
import { IDashboardContainerProps, IGroupedDashboard, IBarData, IDriverCondition, ICollapsibleTableProps } from '../models/dashboard';
import { groupBy } from '../utils/database';
import { getWithSubModel } from './DashboardContainer';
import { IHarshTurnContainerProps, IHarshTurnComponentProps } from '../models/harshTurn';
import HarshTurnComponent from '../components/dashboard/HarshTurnComponent';

const HarshTurnContainer = (props: IHarshTurnContainerProps) => {
    const groupedDataByDriverId = groupBy(props.dashboard, 'DriverVehicleId') as IGroupedDashboard;
    const harshTurn = getWithSubModel(groupedDataByDriverId);
    const barData = props.dashboard.map(c => {
        const data = {
            name: c.PacketTime,
            value: harshTurn.length
        } as IBarData;
        return data;
    });

    const headers = ['Driver Id', 'Driver Name', 'Driver Mobile', 'Vehicle Name', 'Vehicle License No', 'Harsh Turn Count'];

    const driverCondition = {
        includeHarshBrake: false,
        includeHarshTurn: true,
        includeOverSpeed: false
    } as IDriverCondition;
    
    const collapsibleTableProps = {
        data: harshTurn,
        headers: headers,
        driverCondition
    } as ICollapsibleTableProps;

    const harshTurnComponentProps = {
        barData: barData,
        tableData: { ...collapsibleTableProps }
    } as IHarshTurnComponentProps;

    return (
        <HarshTurnComponent {...harshTurnComponentProps} />
    );
};

const mapStateToProps = ({ dashboard }: { dashboard: IDashboardContainerProps }) => {
    return {
        dashboard: dashboard.dashboard
    };
};

export default connect(
    mapStateToProps
)(HarshTurnContainer);
