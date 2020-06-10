import { IPieData } from './dashboard';

export interface ILegendComponentProps {
    data: IPieData[];
}

export interface IPieChartComponentProps {
    plot: IPieData[];
    title: string;
}
