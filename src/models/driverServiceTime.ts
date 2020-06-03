import { IDriver, IVehicle } from './dashboard';

export interface IDriverServiceTimeActionProps {
    loadDriversServiceTime(): void;
}

export interface IDriverServiceTimeProps {
    driversServiceTime: IDriverServiceTimeModel[];
}

export interface IDriverServiceTimeModel {
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