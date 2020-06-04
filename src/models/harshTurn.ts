import { IBarData, IDashboard, IDashboardModel, ICollapsibleTableProps } from './dashboard';
import { IDiscreteSliderProps } from '../components/shared/DiscreteSliderComponent';

export interface IHarshTurnContainerProps {
    dashboard: IDashboard[];
}

export interface IHarshTurnComponentProps {
    barData: IBarData[];
    discreteSlider: IDiscreteSliderProps;
    tableData: ICollapsibleTableProps;
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