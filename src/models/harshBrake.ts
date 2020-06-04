import { IBarData, IDashboard, IDashboardModel, ICollapsibleTableProps } from './dashboard';
import { IDiscreteSliderProps } from '../components/shared/DiscreteSliderComponent';

export interface IHarshBrakeContainerProps {
    dashboard: IDashboard[];
}

export interface IHarshBrakeComponentProps {
    barData: IBarData[];
    tableData: ICollapsibleTableProps;
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