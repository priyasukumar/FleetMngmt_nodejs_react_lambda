import { IDashboard, ICollapsibleTableProps } from './dashboard';
import { IDiscreteSliderProps } from '../components/shared/DiscreteSliderComponent';
import { IDatePickerProps } from './datePicker';
import { IBarComponentProps } from './graph';

export interface IOverSpeedContainerProps {
    overSpeed: IDashboard[];
}

export interface IOverSpeedActionProps {
    loadData: (fromDate: Date, toDate: Date) => void;
}

export interface IOverSpeedComponentProps {
    onDateChange?: (fromDate: Date, toDate: Date) => void;
    leastCrossedDrivers: IBarComponentProps;
    mostCrossedrivers: IBarComponentProps;
    discreteSlider: IDiscreteSliderProps;
    tableData: ICollapsibleTableProps;
    datePicker: IDatePickerProps;
}

export interface IOverSpeedModel {
    DriverId: number;
    DriverName: string;
    DriverMobile: string;
    VehicleName: string;
    VehicleLicenseNo: string;
    OverSpeed: number;
    HarshBraking: number;
    HarshTurning: number;
    CreatedDate: string;
    VehicleSpeed: number;
}