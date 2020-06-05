import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IDashboardContainerProps, IGroupedDashboard, IBarData, IDriverCondition, ICollapsibleTableProps, IDashboardActionProps } from '../models/dashboard';
import HarshBrakeComponent from '../components/dashboard/HarshBrakeComponent';
import { groupBy } from '../utils/database';
import { getWithSubModel } from './DashboardContainer';
import { IHarshBrakeContainerProps, IHarshBrakeComponentProps } from '../models/harshBrake';
import { IDatePickerProps } from '../models/datePicker';
import { loadDashboard } from '../actions/DashboardActions';
import { useState, useEffect } from 'react';

const HarshBrakeContainer = (props: IHarshBrakeContainerProps & IDashboardActionProps) => {
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

    const harshBrakeComponentProps = {
        barData: barData,
        tableData: collapsibleTableProps,
        datePicker: datePickerProps
    } as IHarshBrakeComponentProps;

    useEffect(
        () => {
            if (fromDate && toDate) {
                props.loadData(fromDate, toDate);
            }
        },
        [props.loadData]);

    return (
        <HarshBrakeComponent {...harshBrakeComponentProps} />
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
)(HarshBrakeContainer);
