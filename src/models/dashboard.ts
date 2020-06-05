import { ScaleBand, PieArcDatum } from 'd3';
import { IDriverServiceTimeModel } from './driverServiceTime';

export interface IDashboardContainerProps {
    dashboard: IDashboard[];
}

export interface IDashboardProps {
    dashboard: IDashboard[];
}

export interface IDashboardComponentProps {
    graphData: IPieData[];
    tableData: ICollapsibleTableProps;
}

export interface IHarshBrakeProps {
    HarshBreaking: IPieData[];
    VehicleSpeed: number;
    DriverVehicleId: number;
}

export interface IDashboard {
    VehicleRealTimeInfoId: number;
    DriverVehicleId: number;
    PacketTime: string;
    VehicleSpeed: number;
    HarshTurning: number;
    HarshBreaking: number;
    OverSpeed: number;
    CreatedDate: string;
    ModifiedDate: string;
    DCS_DriverMaster: IDriver;
    DCS_VehicleMaster: IVehicle;
}

export interface IDashboardModel {
    DriverId: number;
    DriverName: string;
    DriverMobile: string;
    VehicleName: string;
    VehicleLicenseNo: string;
    OverSpeed: number;
    HarshBreaking: number;
    HarshTurning: number;
    PacketTime: string;
    CreatedDate: string;
    VehicleSpeed: number;
    SubModel: IDashboardSubModel[];
}

export interface IDashboardSubModel {
    HarshBreaking: number;
    HarshTurning: number;
    PacketTime: string;
    VehicleSpeed: number;
}

export interface IDriver {
    DriverId: number;
    DriverName: string;
    DriverMobile: string;
}

export interface IVehicle {
    VehicleId: number;
    VehicleLicenseNo: string;
    VehicleName: string;
}

export interface IDashboardActionProps {
    loadData(): void;
}

export interface IBarData extends ScaleBand<IBarData> {
    name: string;
    value: number;
}

export interface IPieData extends PieArcDatum<IPieData> {
    name: string;
    color: string;
    value: number;
}

// export interface ICollapsibleTableProps {
//     tableProps: ITableProps[];
// }

// export interface ITableProps {
//     headers: string;
//     data: IDashboardModel;
// }

export interface ICollapsibleTableProps {
    headers: string[];
    data: IDashboardModel[] | IDriverServiceTimeModel[];
    driverCondition: IDriverCondition;
    barData: IBarData[];
}

export interface IRowProps {
    data: IDashboardModel | IDriverServiceTimeModel;
    driverCondition: IDriverCondition;
    barData: IBarData[];
}

export interface IHeaderProps {
    headers: string[];
}

export interface IGroupedDashboard {
    [key: string]: IDashboard[];
}

export interface IDriverCondition {
    includeHarshTurn: boolean;
    includeHarshBrake: boolean;
    includeOverSpeed: boolean;
}
