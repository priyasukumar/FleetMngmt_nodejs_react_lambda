import * as React from 'react';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useEffect, useState } from 'react';
import FuelComponent from '../components/dashboard/FuelUsageComponent';
import { groupBy } from '../utils/database';
import { ICollapsibleTableProps, IGroupedDashboard } from '../models/dashboard';
import { IDatePickerProps } from '../models/datePicker';
import { IFuelComponentProps, IFuelActionProps } from '../models/fuelUsage';
import { getWithSubModel } from './DashboardContainer';
import { loadFuel } from '../actions/FuelUsageActions';
import { IDriverServiceTimeContainerProps ,IDriverServiceTimeActionProps } from '../models/driverServiceTime';
import { ILocationContainerProps } from '../models/location';
import { loadDriversServiceTime } from '../actions/DriverServiceTimeAction';

const FuelContainer = (props: IDriverServiceTimeContainerProps &  IDriverServiceTimeActionProps & IFuelActionProps & ILocationContainerProps) => {
    const headers = [
        { columnName: 'DriverId', columnValue: 'Driver Id' },
        { columnName: 'DriverName', columnValue: 'Driver Name' },
        { columnName: 'VehicleName', columnValue: 'Vehicle Name' },
        { columnName: 'VehicleLicenseNo', columnValue: 'Vehicle License No' },
      ];
    const groupedDataByDriverId = groupBy(props.driversServiceTime, 'DriverVehicleId') as IGroupedDashboard;
    const driverVehicleData = getWithSubModel(groupedDataByDriverId);

    const fuel = useSelector((store:any)=> store.fuel)
    const dates = useSelector((store:any) => store.date) 
    const [driverId,setDriverId] = useState(1);
    
    const collapsibleTableProps = {
        data: driverVehicleData,
        headers,
        driverId,
        handleDriverId: (id:number) =>{setDriverId(id)},
    } as ICollapsibleTableProps;
    
    const datePickerFormat = 'dd/MM/yyyy';
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
            props.loadFuelData(fromDate, toDate, driverId );
        }
    };
    
    const datePickerProps = {
        datePickerDateFormat: datePickerFormat,
        datePickerMinDate: minDate,
        datePickerMaxDate: currentDate,
        datePickerFromDate: fromDate ? fromDate : initialToDateFromState,
        datePickerToDate: toDate ? toDate : currentDateFromState,
        handleDateChange: (fromDate: Date, toDate: Date) => handleDateChange(fromDate, toDate),
        isFuel: true
    } as IDatePickerProps;

    const fuelComponentProps = {
        tableData: collapsibleTableProps,
        datePicker: datePickerProps,
        fuelData: fuel
    } as IFuelComponentProps;

    useEffect(
        () => {
            if (fromDate && toDate) {
                props.loadDriversServiceTime(new Date("2020/06/01"), new Date("2020/06/02"));
            }
        },
        []);
    
    useEffect(()=>{
        if (fromDate && toDate){
            props.loadFuelData(fromDate,toDate,driverId )
        }
    },[fromDate,toDate,driverId])

    return (
        <FuelComponent {...fuelComponentProps} />
    );
};

const mapStateToProps = ({ driversServiceTime, location }: { driversServiceTime: IDriverServiceTimeContainerProps, location: ILocationContainerProps }) => {
    return {
        driversServiceTime: driversServiceTime.driversServiceTime,
        location: location.location
    };
};


const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            loadDriversServiceTime: (fromDate: Date, toDate: Date) => loadDriversServiceTime(fromDate, toDate),
            loadFuelData: (fromDate: Date,toDate: Date, driverId : number)=> loadFuel(fromDate, toDate, driverId)
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FuelContainer);
