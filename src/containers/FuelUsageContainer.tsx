import * as React from 'react';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useEffect, useState } from 'react';
import FuelComponent from '../components/dashboard/FuelUsageComponent';
import { loadFuel } from '../actions/FuelUsageActions';
import { groupBy } from '../utils/database';
import { ICollapsibleTableProps, IGroupedDashboard, IDriverCondition } from '../models/dashboard';
import { IDatePickerProps } from '../models/datePicker';
import { IFuelComponentProps, IFuelContainerProps, IFuelActionProps } from '../models/fuelUsage';
import { getWithSubModel } from './DashboardContainer';

const FuelContainer = (props: IFuelContainerProps & IFuelActionProps) => {
    const headers = [
        { columnName: 'DriverId', columnValue: 'Driver Id' },
        { columnName: 'DriverName', columnValue: 'Driver Name' },
        { columnName: 'DriverMobile', columnValue: 'Driver Mobile' },
        { columnName: 'VehicleName', columnValue: 'Vehicle Name' },
      ];
    const groupedDataByDriverId = groupBy(props.fuel, 'DriverVehicleId') as IGroupedDashboard;
    const DriverVehicleDetails = getWithSubModel(groupedDataByDriverId);
    
    const driverCondition = {
        includeHarshBrake: false,
        includeHarshTurn: true,
        includeOverSpeed: false
    } as IDriverCondition;

    const collapsibleTableProps = {
        data: DriverVehicleDetails,
        driverCondition,
        headers,
    } as ICollapsibleTableProps;

    const datePickerFormat = 'dd/MM/yyyy';
    const dates = useSelector((store:any) => store.date) 
    const currentDateFromState = dates.currentDate
    const initialToDateFromState = dates.initialToDate;
    const minDate = new Date();
    const currentDate = new Date();
    minDate.setMonth(currentDate.getMonth() - 3);
    const [fromDate, setFromDate] = useState<Date | null>(initialToDateFromState);
    const [toDate, setToDate] = useState<Date | null>(currentDateFromState);
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
        datePickerFromDate: fromDate ? fromDate : initialToDateFromState,
        datePickerToDate: toDate ? toDate : currentDateFromState,
        handleDateChange: (fromDate: Date, toDate: Date) => handleDateChange(fromDate, toDate)
    } as IDatePickerProps;

    const fuelComponentProps = {
        tableData: collapsibleTableProps,
        datePicker: datePickerProps,
    } as IFuelComponentProps;

    useEffect(
        () => {
            if (fromDate && toDate) {
                props.loadData(fromDate, toDate);
            }
        },
        [props.loadData]);

    return (
        <FuelComponent {...fuelComponentProps} />
    );
};

const mapStateToProps = ({ fuel }: { fuel: IFuelContainerProps }) => {
    return {
        fuel: fuel.fuel
    };
};

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            loadData: (fromDate: Date, toDate: Date) => loadFuel(fromDate, toDate),
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FuelContainer);
