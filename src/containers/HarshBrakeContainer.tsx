import * as React from 'react';
import { connect } from 'react-redux';
import { IDashboardContainerProps, IGroupedDashboard, IBarData, IDriverCondition, ICollapsibleTableProps } from '../models/dashboard';
import HarshBrakeComponent from '../components/dashboard/HarshBrakeComponent';
import { groupBy } from '../utils/database';
import { getWithSubModel } from './DashboardContainer';
import { IHarshBrakeContainerProps, IHarshBrakeComponentProps } from '../models/harshBrake';

const HarshBrakeContainer = (props: IHarshBrakeContainerProps) => {
    const groupedDataByDriverId = groupBy(props.dashboard, 'DriverVehicleId') as IGroupedDashboard;
    const harshBrake = getWithSubModel(groupedDataByDriverId);
    const barData = props.dashboard.map(c => {
        const data = {
            name: c.PacketTime,
            value: harshBrake.length
        } as IBarData;

        return data;
    });

    const headers = ['Driver Id', 'Driver Name', 'Driver Mobile', 'Vehicle Name', 'Vehicle License No', 'Harsh Brake Count'];

    const driverCondition = {
        includeHarshBrake: true,
        includeHarshTurn: false,
        includeOverSpeed: false
    } as IDriverCondition;
    
    const collapsibleTableProps = {
        data: harshBrake,
        headers: headers,
        driverCondition
    } as ICollapsibleTableProps;

    const harshBrakeComponentProps = {
        barData: barData,
        tableData: { ...collapsibleTableProps }
    } as IHarshBrakeComponentProps;

    return (
        <HarshBrakeComponent {...harshBrakeComponentProps} />
    );
};

const mapStateToProps = ({ dashboard }: { dashboard: IDashboardContainerProps }) => {
    return {
        dashboard: dashboard.dashboard
    };
};

export default connect(
    mapStateToProps
)(HarshBrakeContainer);
