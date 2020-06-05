import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IDashboardContainerProps, IGroupedDashboard, IBarData, IDriverCondition, ICollapsibleTableProps, IDashboardActionProps } from '../models/dashboard';
import { groupBy } from '../utils/database';
import { getWithSubModel } from './DashboardContainer';
import { IHarshTurnContainerProps, IHarshTurnComponentProps } from '../models/harshTurn';
import HarshTurnComponent from '../components/dashboard/HarshTurnComponent';
import { IDatePickerProps } from '../models/datePicker';
import { loadDashboard } from '../actions/DashboardActions';
import { useState, useEffect } from 'react';

const HarshTurnContainer = (props: IHarshTurnContainerProps & IDashboardActionProps) => {
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
    
    const harshTurnComponentProps = {
        barData: barData,
        tableData: collapsibleTableProps,
        datePicker: datePickerProps
    } as IHarshTurnComponentProps;

    useEffect(
        () => {
            if (fromDate && toDate) {
                props.loadData(fromDate, toDate);
            }
        },
        [props.loadData]);
        
    return (
        <HarshTurnComponent {...harshTurnComponentProps} />
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
)(HarshTurnContainer);
