import { IBarData } from '../models/dashboard';
import { getDateRange, isoToLocal } from './date';

export const getBarData = (groupedData: any, fromDate: Date | null, toDate: Date | null, dateFormat: string, property: string): IBarData[] => {
    let barData = [] as IBarData[];

    if (fromDate && toDate) {
        const range = getDateRange(fromDate, toDate, 'date');
        range.map(d => {
            const date = isoToLocal(d.toISOString(), dateFormat);
            const dashboard = groupedData[date];
            const count = dashboard ? dashboard.reduce((c: number, p: any) => c + p[property], 0) : 0;
            let barModel = {
                name: date,
                value: count
            } as IBarData;

            barData.push(barModel);
        });
    }

    return barData;
};