import * as React from 'react';
import { connect } from 'react-redux';
import OverSpeedComponent from '../components/dashboard/OverSpeedComponent';
import { IDashboardContainerProps, IBarData, IDashboard, IGroupedDashboard, IDashboardModel, ICollapsibleTableProps, IDriverCondition } from '../models/dashboard';
import { useState } from 'react';
import { IOverSpeedComponentProps, IOverSpeedContainerProps } from '../models/overSpeed';
import { IDiscreteSliderProps } from '../components/shared/DiscreteSliderComponent';
import { groupBy } from '../utils/database';
import Moment from 'moment';
import { getWithSubModel } from './DashboardContainer';

const OverSpeedContainer = (props: IOverSpeedContainerProps) => {
    const [speedLimit, onSpeedLimitChange] = useState(60);
    const initialBarState: IDashboard[] = [];
    const [barData1, onBarDataChange] = useState(initialBarState);

    const groupedDataByDriverId = groupBy(props.dashboard, 'DriverVehicleId') as IGroupedDashboard;
    const overSpeed = getWithSubModel(groupedDataByDriverId, speedLimit);
    const dateFormat1 = 'd/MM/YY HH:mm a';
    const dateFormat = 'dddd';
    const barData = props.dashboard.map(c => {
        const data = {
            name: c.PacketTime,
            value: c.OverSpeed
        } as IBarData;
        return data;
    });

    const discreteSliderProps = {
        title: 'Speed Limit',
        min: 0,
        max: 120,
        speedLimit: speedLimit,
        onSliderChange: (limit: number) => onSpeedLimitChange(limit),
    } as IDiscreteSliderProps;

    const headers = ['Driver Id', 'Driver Name', 'Driver Mobile', 'Vehicle Name', 'Vehicle License No', 'Over Speed'];

    const driverCondition = {
        includeHarshBrake: false,
        includeHarshTurn: false,
        includeOverSpeed: true
    } as IDriverCondition;
    
    const collapsibleTableProps = {
        data: overSpeed,
        headers: headers,
        driverCondition
    } as ICollapsibleTableProps;

    const overSpeedComponentProps = {
        barData: barData,
        discreteSlider: discreteSliderProps,
        tableData: { ...collapsibleTableProps }
    } as IOverSpeedComponentProps;

    return (
        <OverSpeedComponent {...overSpeedComponentProps} />
    );
};

const mapStateToProps = ({ dashboard }: { dashboard: IDashboardContainerProps }) => {
    return {
        dashboard: dashboard.dashboard
    };
};

export default connect(
    mapStateToProps
)(OverSpeedContainer);