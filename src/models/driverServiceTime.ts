import { IDriver, IVehicle, ICollapsibleTableProps } from './dashboard';

export interface IDriverServiceTimeActionProps {
    loadDriversServiceTime(): void;
}

export interface IDriverServiceTimeContainerProps {
    driversServiceTime: IDriverServiceTime[];
}

export interface IDriverServiceTimeComponentProps {
    tableData: ICollapsibleTableProps;
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
}

export interface IDriverServiceTimeModel {
    DriverId: number;
    DriverName: string;
    DriverMobile: string;
    VehicleName: string;
    VehicleLicenseNo: string;
    SubModel: IDriverServiceTimeSubModel[];
}

export interface IDriverServiceTimeSubModel {
    RestingStartTime: string;
    RestingEndTime: string;
    VehicleStartTime: string;
    VehicleEndTime: string;
}
