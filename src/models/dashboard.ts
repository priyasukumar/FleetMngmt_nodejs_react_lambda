import { ScaleBand, PieArcDatum } from 'd3';

export interface IDashboardProps {
    data: IPieData[];
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