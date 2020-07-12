import { UPDATE_FUEL, API_FUEL } from '../constants/Actions';
import { Http } from '../constants/enum';
import * as DateFns from 'date-fns';

export const loadFuel = (fromDate: Date, toDate: Date,driverId: number) => {
const dateFormat = 'yyyy-MM-dd';
    const formattedFromDate = DateFns.format(fromDate, dateFormat);
    const formattedToDate = DateFns.format(toDate, dateFormat);
    const fuelUsageUrl = `/fuelinfo?driverId=${driverId}&fromDate=${formattedFromDate}&toDate=${formattedToDate}`;

    return (dispatch: any) => {
        dispatch({
            type: API_FUEL,
            payload: {
                url: fuelUsageUrl,
                method: Http.Get,
                onSuccess: (response: any) => {
                    dispatch({
                        type: UPDATE_FUEL,
                        payload: {fuel: response}
                    });
                }
            }
        });
    };
};