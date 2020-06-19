import { IDriver, IVehicle, ICollapsibleTableProps } from './dashboard';
import { IDatePickerProps } from './datePicker';

export interface IDriverServiceTimeActionProps {
    loadDriversServiceTime: (fromDate: Date, toDate: Date) => void;
}

export interface IDriverServiceTimeContainerProps {
    driversServiceTime: IDriverServiceTime[];
}

export interface IDriverServiceTimeComponentProps {
    tableData: ICollapsibleTableProps;
    datePicker: IDatePickerProps;
}

export interface IGroupedDriverServiceTime {
    [key: string]: IDriverServiceTime[];
}

export interface IDriverServiceTime {
    DriverServiceId: number;
    DriverVehicleId: number;
    VehicleStartTime: string;
    VehicleEndTime: string;
    RestingStartTime: string;
    RestingEndTime: string;
    CreatedDate: string;
    ModifiedDate: string;
    DCS_DriverMaster: IDriver;
    DCS_VehicleMaster: IVehicle;
    DrivingTimeHours: number;
    WorkTimeHours: number;
    RestTimeHours: number;
}

export interface IDriverServiceTimeModel {
    DriverId: number;
    DriverName: string;
    DriverMobile: string;
    VehicleName: string;
    VehicleLicenseNo: string;
    SubModel: IDriverServiceTimeSubModel[];
    DrivingTimeHours: number;
    WorkTimeHours: number;
    RestTimeHours: number;
}

export interface IDriverServiceTimeSubModel {
    RestingStartTime: string;
    RestingEndTime: string;
    VehicleStartTime: string;
    VehicleEndTime: string;
}
