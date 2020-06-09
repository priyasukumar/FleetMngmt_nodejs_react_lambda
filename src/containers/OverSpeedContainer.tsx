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
import { IBarComponentProps } from '../core/BarComponent';

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

    const headers = ['Driver Id', 'Driver Name', 'Driver Mobile', 'Vehicle Name', 'Vehicle License No', 'Over Speed Count'];

    const driverCondition = {
        includeHarshBrake: false,
        includeHarshTurn: false,
        includeOverSpeed: true
    } as IDriverCondition;

    const datePickerFormat = 'dd/MM/yyyy';
    const currentDate = new Date();
    const initialToDate = new Date();
    initialToDate.setDate(initialToDate.getDate() - 1);
    const minDate = new Date();
    minDate.setMonth(currentDate.getMonth() - 3);
    const [fromDate, setFromDate] = useState<Date | null>(initialToDate);
    const [toDate, setToDate] = useState<Date | null>(currentDate);
    const handleFromDateChange = (date: Date | null) => {
        if (date && toDate) {
            setFromDate(date);
            props.loadData(date, toDate);
        }
    };
    const handleToDateChange = (date: Date | null) => {
        if (date && fromDate) {
            setToDate(date);
            props.loadData(fromDate, date);
        }
    };

    const datePickerProps = {
        datePickerDateFormat: datePickerFormat,
        datePickerMinDate: minDate,
        datePickerMaxDate: currentDate,
        datePickerFromDate: fromDate ? fromDate : initialToDate,
        datePickerToDate: toDate ? toDate : currentDate,
        handleFromDateChange: (date: Date) => handleFromDateChange(date),
        handleToDateChange: (date: Date) => handleToDateChange(date)
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

    const leasCrossedtOverSpeed = {
        title: 'Top Most Crossed',
        yaxisTitle: 'Over Speed Count',
        plot: sortBy(overSpeed, Driver.OverSpeed , 'desc')
    } as IBarComponentProps;

    const mostCrossedOverSpeed = {
        title: 'Top Least Crossed',
        yaxisTitle: 'Over Speed Count',
        plot: sortBy(overSpeed, Driver.OverSpeed)
    } as IBarComponentProps;

    const overSpeedComponentProps = {
        leastAppliedDrivers: mostCrossedOverSpeed,
        mostAppliedDrivers: leasCrossedtOverSpeed,
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