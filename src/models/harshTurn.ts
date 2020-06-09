import { IBarData, IDashboard, IDashboardModel, ICollapsibleTableProps } from './dashboard';
import { IDiscreteSliderProps } from '../components/shared/DiscreteSliderComponent';
import { IDatePickerProps } from './datePicker';
import { IBarComponentProps } from '../core/BarComponent';

export interface IHarshTurnContainerProps {
    harshTurn: IDashboard[];
    onDateChange?: (fromDate: Date, toDate: Date) => void;
}

export interface IHarshTurnActionProps {
    loadData: (fromDate: Date, toDate: Date) => void;
}

export interface IHarshTurnComponentProps {
    leastAppliedDrivers: IBarComponentProps;
    mostAppliedDrivers: IBarComponentProps;
    discreteSlider: IDiscreteSliderProps;
    tableData: ICollapsibleTableProps;
    datePicker: IDatePickerProps;
}

export interface IHarshTurnModel {
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