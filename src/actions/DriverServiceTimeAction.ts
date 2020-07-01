import { API, UPDATE_DRIVER_SERVICE_TIME } from '../constants/Actions';
import { Http } from '../constants/enum';
import * as DateFns from 'date-fns';

export const loadDriversServiceTime = (fromDate: Date, toDate: Date) => {
    const dateFormat = 'yyyy-MM-dd';
    const formattedFromDate = DateFns.format(fromDate, dateFormat);
    const formattedToDate = DateFns.format(toDate, dateFormat);
    const driverServiceUrl = `/driverservice?from=${formattedFromDate}&to=${formattedToDate}`;

    return (dispatch: any) => {
        dispatch({
            type: API,
            payload: {
                url: driverServiceUrl,
                method: Http.Get,
                onSuccess: (response: any) => {
                    dispatch({
                        type: UPDATE_DRIVER_SERVICE_TIME,
                        payload: { driversServiceTime: response }
                    });
                }
            }
        });
    };
};