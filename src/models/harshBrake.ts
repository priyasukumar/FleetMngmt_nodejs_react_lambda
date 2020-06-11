import { IDashboard, ICollapsibleTableProps } from './dashboard';
import { IDatePickerProps } from './datePicker';
import { IBarComponentProps } from './graph';

export interface IHarshBrakeContainerProps {
    harshBrake: IDashboard[];
    onDateChange?: (fromDate: Date, toDate: Date) => void;
}

export interface IHarshBrakeActionProps {
    loadData: (fromDate: Date, toDate: Date) => void;
}

export interface IHarshBrakeComponentProps {
    leastAppliedDrivers: IBarComponentProps;
    mostAppliedDrivers: IBarComponentProps;
    tableData: ICollapsibleTableProps;
    datePicker: IDatePickerProps;
}

export interface IHarshBrakeModel {
    DriverId: number;
    DriverName: string;
    DriverMobile: string;
    VehicleName: string;
    VehicleLicenseNo: string;
    OverSpeed: number;
    HarshBreaking: number;
    HarshTurning: number;
    CreatedDate: string;
    VehicleSpeed: number;    
}