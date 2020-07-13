import { IDriver, IVehicle, ICollapsibleTableProps } from './dashboard';
import { IDatePickerProps } from './datePicker';

export interface IFuelComponentProps {
    tableData: ICollapsibleTableProps;
    datePicker: IDatePickerProps;
    fuelData: IFuelModel;
}

export interface IFuelActionProps {
    loadData: (fromDate: Date, toDate: Date) => void;
    loadFuelData: (fromDate: Date, toDate: Date, driverId: number) => void;
}

export interface IDriverVehicleModel {
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

export interface IDriverFuelUsageActionProps {
    loadFuelUsage: (fromDate: Date, toDate: Date, driverId: number) => void;
}
export interface IFuelModel {
    fuel: IFuelUsageModel;
}
export interface IFuelUsageModel {
    FuelInfoModel: IFuelInfoModel [],
    RefuelModel: IRefuelModel [] | null,
    LeakageModel:ILeakageModel [] | null,
    TheftModel: ITheftModel [] | null
}

export interface IFuelInfoModel {
    VehicleId: number,
    Volume: number,
    PacketTime: Date
}

export interface IRefuelModel {
    VehicleId: number,
    Volume: number,
    PacketTime: Date
}

export interface ILeakageModel {
    VehicleId: number,
    Volume: number,
    PacketTime: Date
}

export interface ITheftModel {
    VehicleId: number,
    Volume: number,
    PacketTime: Date
}