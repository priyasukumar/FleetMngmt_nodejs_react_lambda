import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useEffect, useState } from 'react';
import { IDriverServiceTimeActionProps, IDriverServiceTimeContainerProps, IDriverServiceTimeComponentProps, IGroupedDriverServiceTime, IDriverServiceTimeModel, IDriverServiceTimeSubModel } from '../models/driverServiceTime';
import DriverServiceComponent from '../components/dashboard/DriverServiceComponent';
import { loadDriversServiceTime } from '../actions/DriverServiceTimeAction';
import { groupBy, toFixed } from '../utils/database';
import { ICollapsibleTableProps } from '../models/dashboard';
import { IDatePickerProps } from '../models/datePicker';

const DriverServiceTimeContainer = (props: IDriverServiceTimeContainerProps & IDriverServiceTimeActionProps) => {
    const headers = [
        { columnName: 'DriverId', columnValue: 'Driver Id' },
        { columnName: 'DriverName', columnValue: 'Driver Name' },
        { columnName: 'DriverMobile', columnValue: 'Driver Mobile' },
        { columnName: 'VehicleName', columnValue: 'Vehicle Name' },
        { columnName: 'VehicleLicenseNo', columnValue: 'Vehicle License No' },
        { columnName: 'DrivingTimeHours', columnValue: 'Driving Time Hours' },
        { columnName: 'WorkTimeHours', columnValue: 'Work Time Hours' },
        { columnName: 'RestTimeHours', columnValue: 'Rest Time Hours' },
      ];
    const groupedDataByDriverId = groupBy(props.driversServiceTime, 'DriverVehicleId') as IGroupedDriverServiceTime;
    const driverServiceTime = getWithSubModel(groupedDataByDriverId);

    const collapsibleTableProps = {
        data: driverServiceTime,
        headers,
    } as ICollapsibleTableProps;

    const datePickerFormat = 'dd/MM/yyyy';
    const currentDate = new Date();
    const initialToDate = new Date();
    initialToDate.setDate(initialToDate.getDate() - 7);
    const minDate = new Date();
    minDate.setMonth(currentDate.getMonth() - 3);
    const [fromDate, setFromDate] = useState<Date | null>(initialToDate);
    const [toDate, setToDate] = useState<Date | null>(currentDate);
    const handleFromDateChange = (date: Date | null) => {
        if (date && toDate) {
            setFromDate(date);
            props.loadDriversServiceTime(date, toDate);
        }
    };
    const handleToDateChange = (date: Date | null) => {
        if (date && fromDate) {
            setToDate(date);
            props.loadDriversServiceTime(fromDate, date);
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

    const driverServiceTimeComponentProps = {
        tableData: collapsibleTableProps,
        datePicker: datePickerProps
    } as IDriverServiceTimeComponentProps;

    useEffect(
        () => {
            if (fromDate && toDate) {
                props.loadDriversServiceTime(fromDate, toDate);
            }
        },
        [props.loadDriversServiceTime]);

    return (
        <DriverServiceComponent {...driverServiceTimeComponentProps} />
    );
};

export const getWithSubModel = (groupedData: IGroupedDriverServiceTime): IDriverServiceTimeModel[] => {
    let driverServiceTime = [] as IDriverServiceTimeModel[];

    for (let key in groupedData) {
        if (key) {
            const {
                DCS_DriverMaster: { DriverId, DriverMobile, DriverName },
                CreatedDate,
                DCS_VehicleMaster: { VehicleLicenseNo, VehicleName }
            } = groupedData[key][0];
            const driverServiceTimeModel = {
                DriverId,
                CreatedDate,
                DriverMobile,
                DriverName,
                VehicleLicenseNo,
                VehicleName,
                DrivingTimeHours: 0,
                WorkTimeHours: 0,
                RestTimeHours: 0,
                SubModel: [] as IDriverServiceTimeSubModel[]
            } as IDriverServiceTimeModel;

            groupedData[key].map((c, index) => {
                driverServiceTimeModel.RestTimeHours += c.RestTimeHours;
                driverServiceTimeModel.DrivingTimeHours += c.DrivingTimeHours;
                driverServiceTimeModel.WorkTimeHours += c.WorkTimeHours;
                driverServiceTimeModel.SubModel[index] = {
                    RestingStartTime: '',
                    RestingEndTime: '',
                    VehicleStartTime: '',
                    VehicleEndTime: ''
                } as IDriverServiceTimeSubModel;
                driverServiceTimeModel.SubModel[index].RestingStartTime = c.RestingStartTime;
                driverServiceTimeModel.SubModel[index].RestingEndTime = c.RestingEndTime;
                driverServiceTimeModel.SubModel[index].VehicleStartTime = c.VehicleStartTime;
                driverServiceTimeModel.SubModel[index].VehicleEndTime = c.VehicleEndTime;

                return c;
            });

            driverServiceTimeModel.RestTimeHours = toFixed(driverServiceTimeModel.RestTimeHours);
            driverServiceTimeModel.DrivingTimeHours = toFixed(driverServiceTimeModel.DrivingTimeHours);
            driverServiceTime.push(driverServiceTimeModel);
        }
    }
    return driverServiceTime;
};

const mapStateToProps = ({ driversServiceTime }: { driversServiceTime: IDriverServiceTimeContainerProps }) => {
    return {
        driversServiceTime: driversServiceTime.driversServiceTime
    };
};

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            loadDriversServiceTime: (fromDate: Date, toDate: Date) => loadDriversServiceTime(fromDate, toDate)
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DriverServiceTimeContainer);
