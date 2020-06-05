import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OverSpeedComponent from '../components/dashboard/OverSpeedComponent';
import { IDashboardContainerProps, IBarData, IDashboard, IGroupedDashboard, ICollapsibleTableProps, IDriverCondition, IDashboardActionProps } from '../models/dashboard';
import { useState, useEffect } from 'react';
import { IOverSpeedComponentProps, IOverSpeedContainerProps } from '../models/overSpeed';
import { IDiscreteSliderProps } from '../components/shared/DiscreteSliderComponent';
import { groupBy } from '../utils/database';
import { getWithSubModel } from './DashboardContainer';
import { IDatePickerProps } from '../models/datePicker';
import { loadDashboard } from '../actions/DashboardActions';

const OverSpeedContainer = (props: IOverSpeedContainerProps & IDashboardActionProps) => {
    const [speedLimit, onSpeedLimitChange] = useState(60);
    const initialBarState: IDashboard[] = [];
    const [barData1, onBarDataChange] = useState(initialBarState);

    const groupedDataByDriverId = groupBy(props.dashboard, 'DriverVehicleId') as IGroupedDashboard;
    const overSpeed = getWithSubModel(groupedDataByDriverId, speedLimit);
    let count = 0;

    const barData = props.dashboard.map(c => {
        if (c.VehicleSpeed >= speedLimit) {
            count += 1;
        }

        const data = {
            name: c.PacketTime,
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

    const dateFormat = 'MM/dd/yyyy';
    const currentDate = new Date();
    const minDate = new Date();
    minDate.setMonth(currentDate.getMonth() - 3);
    const [fromDate, setFromDate] = useState<Date | null>(minDate);
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
        datePickerDateFormat: dateFormat,
        datePickerMinDate: minDate,
        datePickerMaxDate: currentDate,
        datePickerFromDate: fromDate ? fromDate : minDate,
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

const mapStateToProps = ({ dashboard }: { dashboard: IDashboardContainerProps }) => {
    return {
        dashboard: dashboard.dashboard
    };
};

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            loadData: (fromDate: Date, toDate: Date) => loadDashboard(fromDate, toDate),
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OverSpeedContainer);