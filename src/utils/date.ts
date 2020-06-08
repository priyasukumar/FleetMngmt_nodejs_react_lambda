import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import DateRange, { unitOfTime } from 'moment';

const moment = extendMoment(Moment);

export const isoToLocal = (isoTime: string, format: string): string => {
    const utc = moment.utc(isoTime);
    return utc.local().format(format);
};

export const getDateRange = (fromDate: Date, toDate: Date, unit: unitOfTime.All): Date[] => {
    const range = moment.range(fromDate, toDate);
    const dateRange = [] as Date[];
    while (range.start < range.end) {
        dateRange.push(range.start.toDate());
        const newDate = range.start.set(unit, range.start.date() + 1);
        range.start = moment(newDate);
    }

    return dateRange;
};

export const getDateRangeDiff = (fromDate: Date, toDate: Date, unit: unitOfTime.Diff): number => {
    const range = moment.range(fromDate, toDate);
    return range.diff(unit);
};