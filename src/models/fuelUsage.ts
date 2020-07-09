import { IDriver, IVehicle, ICollapsibleTableProps } from './dashboard';
import { IDatePickerProps } from './datePicker';

export interface IFuelComponentProps {
    tableData: ICollapsibleTableProps;
    datePicker: IDatePickerProps;
}

export interface IFuelActionProps {
    loadData: (fromDate: Date, toDate: Date) => void;
}

export interface IFuelContainerProps {
    fuel: IDriverVehicleModel[];
    onDateChange?: (fromDate: Date, toDate: Date) => void;
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
