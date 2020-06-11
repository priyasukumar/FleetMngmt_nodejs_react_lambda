import { IPieData, IBarData } from './dashboard';

export interface ILegendComponentProps {
    data: IPieData[];
}

export interface IPieChartComponentProps {
    plot: IPieData[];
    title: string;
}

export interface IBarComponentProps {
    plot: IBarData[];
    barColor: string;
    title: string;
    yaxisTitle: string;
}
