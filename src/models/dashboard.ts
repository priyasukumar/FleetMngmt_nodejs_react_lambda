import { ScaleBand, PieArcDatum } from 'd3';

export interface IDashboardProps {
    dashboard: IDashboard[];
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
    HarshTurning: number;
    HarshBreaking: number;
    OverSpeed: number;
    CreatedDate: string;
    DriverName: string;
    DriverMobile: string;
    VehicleLicenseNo: string;
    VehicleName: string;
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

export interface ICollapsibleTableProps {
    data: IDashboardModel[];
}

export interface IRowProps {
    data: IDashboardModel;
}

export interface IGroupedDashboard {
    [key: string]: IDashboard[];
}