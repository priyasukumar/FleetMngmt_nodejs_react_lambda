import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OverSpeedComponent from '../components/dashboard/OverSpeedComponent';
import { IDashboardContainerProps, IBarData, IDashboard, IGroupedDashboard, ICollapsibleTableProps, IDriverCondition, IDashboardActionProps } from '../models/dashboard';
import { useState, useEffect } from 'react';
import { IOverSpeedComponentProps, IOverSpeedContainerProps, IOverSpeedActionProps } from '../models/overSpeed';
import { IDiscreteSliderProps } from '../components/shared/DiscreteSliderComponent';
import { groupBy } from '../utils/database';
import { getWithSubModel } from './DashboardContainer';
import { IDatePickerProps } from '../models/datePicker';
import { loadDashboard } from '../actions/DashboardActions';
import { isoToLocal } from '../utils/date';
import { loadOverSpeed } from '../actions/OverSpeedActions';

const OverSpeedContainer = (props: IOverSpeedContainerProps & IOverSpeedActionProps) => {
    const dateFormat = 'DD/MM/YYYY';
    const [speedLimit, onSpeedLimitChange] = useState(80);
    const initialBarState: IDashboard[] = [];
    const [barData1, onBarDataChange] = useState(initialBarState);

    const groupedDataByDriverId = groupBy(props.overSpeed, 'DriverVehicleId') as IGroupedDashboard;
    const overSpeed = getWithSubModel(groupedDataByDriverId, speedLimit).filter(c => c.OverSpeed > 0);
    let count = 0;

    const barData = props.overSpeed.map(c => {
        if (c.VehicleSpeed >= speedLimit) {
            count += 1;
        }

        const data = {
            name: isoToLocal(c.PacketTime, dateFormat),
            value: count
        } as IBarData;

        count = 0;
        return data;
    });

    const discreteSliderProps = {
        title: 'Speed Limit',
        min: 0,
        max: 120,
        speedLimit: speedLimit,
        onSliderChange: (limit: number) => onSpeedLimitChange(limit),
    } as IDiscreteSliderProps;

    const headers = ['Driver Id', 'Driver Name', 'Driver Mobile', 'Vehicle Name', 'Vehicle License No', 'Over Speed Count'];

    const driverCondition = {
        includeHarshBrake: false,
        includeHarshTurn: false,
        includeOverSpeed: true
    } as IDriverCondition;

    const collapsibleTableProps = {
        data: overSpeed,
        headers: headers,
        driverCondition,
        barData
    } as ICollapsibleTableProps;

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

    const overSpeedComponentProps = {
        barData: barData,
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