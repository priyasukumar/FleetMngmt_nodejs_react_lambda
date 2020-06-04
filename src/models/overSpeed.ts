import { IBarData, IDashboard, IDashboardModel, ICollapsibleTableProps } from './dashboard';
import { IDiscreteSliderProps } from '../components/shared/DiscreteSliderComponent';

export interface IOverSpeedContainerProps {
    dashboard: IDashboard[];
}

export interface IOverSpeedComponentProps {
    barData: IBarData[];
    discreteSlider: IDiscreteSliderProps;
    tableData: ICollapsibleTableProps;
}

export interface IOverSpeedModel {
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