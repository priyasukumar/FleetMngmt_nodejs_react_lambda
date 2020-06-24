import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OverSpeedComponent from '../components/dashboard/OverSpeedComponent';
import { IGroupedDashboard, ICollapsibleTableProps, IDriverCondition, IDashboardModel } from '../models/dashboard';
import { useState, useEffect } from 'react';
import { IOverSpeedComponentProps, IOverSpeedContainerProps, IOverSpeedActionProps } from '../models/overSpeed';
import { IDiscreteSliderProps } from '../components/shared/DiscreteSliderComponent';
import { groupBy } from '../utils/database';
import { getWithSubModel } from './DashboardContainer';
import { IDatePickerProps } from '../models/datePicker';
import { isoToLocal } from '../utils/date';
import { loadOverSpeed } from '../actions/OverSpeedActions';
import { getBarData, sortBy } from '../utils/driver';
import { Driver } from '../constants/enum';
import { IBarComponentProps } from '../models/graph';

const OverSpeedContainer = (props: IOverSpeedContainerProps & IOverSpeedActionProps) => {
    const dateFormat = 'DD/MM/YYYY';
    const [speedLimit, onSpeedLimitChange] = useState(80);

    const discreteSliderProps = {
        title: 'Speed Limit',
        min: 0,
        max: 120,
        speedLimit: speedLimit,
        onSliderChange: (limit: number) => onSpeedLimitChange(limit),
    } as IDiscreteSliderProps;
    const groupedDataByDriverId = groupBy(props.overSpeed, 'DriverVehicleId') as IGroupedDashboard;
    const overSpeed = getWithSubModel(groupedDataByDriverId, speedLimit).filter(c => c.OverSpeed > 0).filter(c => c.SubModel = c.SubModel.filter(d => d.VehicleSpeed >= speedLimit));
    const headers = [
        { columnName: 'DriverId', columnValue: 'Driver Id' },
        { columnName: 'DriverName', columnValue: 'Driver Name' },
        { columnName: 'DriverMobile', columnValue: 'Driver Mobile' },
        { columnName: 'VehicleName', columnValue: 'Vehicle Name' },
        { columnName: 'VehicleLicenseNo', columnValue: 'Vehicle License No' },
        { columnName: 'OverSpeed', columnValue: 'Over Speed Count' },
      ];

    const driverCondition = {
        includeHarshBrake: false,
        includeHarshTurn: false,
        includeOverSpeed: true
    } as IDriverCondition;

    const datePickerFormat = 'dd/MM/yyyy';
    const currentDate = new Date();
    const initialToDate = new Date();
    initialToDate.setDate(initialToDate.getDate() - 10);
    const minDate = new Date();
    minDate.setMonth(currentDate.getMonth() - 3);
    const [fromDate, setFromDate] = useState<Date | null>(initialToDate);
    const [toDate, setToDate] = useState<Date | null>(currentDate);
    
    const handleDateChange = (fromDate: Date | null, toDate: Date | null) => {
        if (toDate && fromDate) {
            setToDate(toDate);
            setFromDate(fromDate);
            props.loadData(fromDate, toDate);
        }
    };

    const datePickerProps = {
        datePickerDateFormat: datePickerFormat,
        datePickerMinDate: minDate,
        datePickerMaxDate: currentDate,
        datePickerFromDate: fromDate ? fromDate : initialToDate,
        datePickerToDate: toDate ? toDate : currentDate,
        handleDateChange: (fromDate: Date, toDate: Date) => handleDateChange(fromDate, toDate)
    } as IDatePickerProps;

    const dashboardClone = JSON.parse(JSON.stringify(overSpeed)) as IDashboardModel[];
    dashboardClone.forEach(c => c.PacketTime = isoToLocal(c.PacketTime, dateFormat));
    const groupedDataByPacketTime = groupBy(dashboardClone, Driver.PacketTime) as IGroupedDashboard;
    const barData = getBarData(groupedDataByPacketTime, fromDate, toDate, dateFormat, Driver.OverSpeed);

    const collapsibleTableProps = {
        data: overSpeed,
        headers: headers,
        driverCondition,
        barData
    } as ICollapsibleTableProps;

    const mostCrossedOverSpeed = {
        title: 'Top Most Crossed',
        yaxisTitle: 'Over Speed Count',
        plot: sortBy(overSpeed, Driver.OverSpeed , 'desc'),
        barColor: '#e6601d'
    } as IBarComponentProps;

    const leastCrossedOverSpeed = {
        title: 'Top Least Crossed',
        yaxisTitle: 'Over Speed Count',
        plot: sortBy(overSpeed, Driver.OverSpeed),
        barColor: '#e6601d'
    } as IBarComponentProps;

    const overSpeedComponentProps = {
        leastCrossedDrivers: leastCrossedOverSpeed,
        mostCrossedrivers: mostCrossedOverSpeed,
        discreteSlider: discreteSliderProps,
        tableData: collapsibleTableProps,
        datePicker: datePickerProps
    } as IOverSpeedComponentProps;

    useEffect(
        () => {
            if (fromDate && toDate) {
                props.loadData(fromDate, toDate);
            }
        },
        [props.loadData]);

    return (
        <OverSpeedComponent {...overSpeedComponentProps} />
    );
};

const mapStateToProps = ({ overSpeed }: { overSpeed: IOverSpeedContainerProps }) => {
    return {
        overSpeed: overSpeed.overSpeed
    };
};

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            loadData: (fromDate: Date, toDate: Date) => loadOverSpeed(fromDate, toDate),
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OverSpeedContainer);