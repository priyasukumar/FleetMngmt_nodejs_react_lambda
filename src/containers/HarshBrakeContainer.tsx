import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IGroupedDashboard, IDriverCondition, ICollapsibleTableProps } from '../models/dashboard';
import HarshBrakeComponent from '../components/dashboard/HarshBrakeComponent';
import { groupBy } from '../utils/database';
import { getWithSubModel } from './DashboardContainer';
import { IHarshBrakeContainerProps, IHarshBrakeComponentProps, IHarshBrakeActionProps } from '../models/harshBrake';
import { IDatePickerProps } from '../models/datePicker';
import { useState, useEffect } from 'react';
import { loadHarshBrake } from '../actions/HarshBrakeActions';
import { sortBy } from '../utils/driver';
import { IBarComponentProps } from '../models/graph';
import { Driver } from '../constants/enum';

const HarshBrakeContainer = (props: IHarshBrakeContainerProps & IHarshBrakeActionProps) => {
    const groupedDataByDriverId = groupBy(props.harshBrake, 'DriverVehicleId') as IGroupedDashboard;
    const harshBrake = getWithSubModel(groupedDataByDriverId).filter(c => c.HarshBraking > 0).filter(c => c.SubModel = c.SubModel.filter(d => d.HarshBraking > 0));
    const headers = [
        { columnName: 'DriverId', columnValue: 'Driver Id' },
        { columnName: 'DriverName', columnValue: 'Driver Name' },
        { columnName: 'DriverMobile', columnValue: 'Driver Mobile' },
        { columnName: 'VehicleName', columnValue: 'Vehicle Name' },
        { columnName: 'VehicleLicenseNo', columnValue: 'Vehicle License No' },
        { columnName: 'HarshBraking', columnValue: 'Harsh Brake Count' },
      ];

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

    const datePickerFormat = 'dd/MM/yyyy';
    const currentDate = new Date();
    const initialToDate = new Date();
    initialToDate.setDate(initialToDate.getDate() - 15);
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

    // const dashboardClone = JSON.parse(JSON.stringify(props.harshBrake)) as IDashboard[];
    // dashboardClone.forEach(c => c.PacketTime = isoToLocal(c.PacketTime, dateFormat));
    // const groupedDataByPacketTime = groupBy(dashboardClone, Driver.PacketTime) as IGroupedDashboard;
    // const barData = getBarData(groupedDataByPacketTime, fromDate, toDate, dateFormat, Driver.HarshBrake);

    const mostAppliedHarshBrake = {
        title: 'Top Most Applied',
        yaxisTitle: 'Harsh Brake Count',
        plot: sortBy(harshBrake, Driver.HarshBrake, 'desc'),
        barColor: '#aec7e8'
    } as IBarComponentProps;

    const leastAppliedHarshBrake = {
        title: 'Top Least Applied',
        yaxisTitle: 'Top Harsh Brake Count',
        plot: sortBy(harshBrake, Driver.HarshBrake),
        barColor: '#aec7e8'
    } as IBarComponentProps;

    const harshBrakeComponentProps = {
        leastAppliedDrivers: leastAppliedHarshBrake,
        mostAppliedDrivers: mostAppliedHarshBrake,
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

const mapStateToProps = ({ harshBrake }: { harshBrake: IHarshBrakeContainerProps }) => {
    return {
        harshBrake: harshBrake.harshBrake
    };
};

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            loadData: (fromDate: Date, toDate: Date) => loadHarshBrake(fromDate, toDate),
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HarshBrakeContainer);
