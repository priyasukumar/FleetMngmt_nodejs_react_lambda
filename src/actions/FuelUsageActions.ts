import { API, UPDATE_FUEL } from '../constants/Actions';
import { Http } from '../constants/enum';
import * as DateFns from 'date-fns';

export const loadFuel = (fromDate: Date, toDate: Date) => {
    const dateFormat = 'yyyy-MM-dd';
    const formattedFromDate = DateFns.format(fromDate, dateFormat);
    const formattedToDate = DateFns.format(toDate, dateFormat);
    const driverInsightsUrl = `/drivinginsights?from=${formattedFromDate}&to=${formattedToDate}`;

    return (dispatch: any) => {
        dispatch({
            type: API,
            payload: {
                url: driverInsightsUrl,
                method: Http.Get,
                onSuccess: (response: any) => {
                    dispatch({
                        type: UPDATE_FUEL,
                        payload: { fuel: response }
                    });
                }
            }
        });
    };
};