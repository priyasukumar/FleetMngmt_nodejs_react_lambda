import { API, UPDATE_LOCATION } from '../constants/Actions';
import { Http } from '../constants/enum';
import * as DateFns from 'date-fns';

export const loadLocation = (driverId: number, fromDate: Date, toDate: Date) => {
    const locationServiceUrl = `https://z2mc69mhh6.execute-api.us-east-1.amazonaws.com/Prod/api/location?driverid=${driverId}&fromDate=${fromDate}&toDate=${toDate}`;

    return (dispatch: any) => {
        dispatch({
            type: API,
            payload: {
                url: locationServiceUrl,
                method: Http.Get,
                apiFunctionality: 'location',
                onSuccess: (response: any) => {
                    dispatch({
                        type: UPDATE_LOCATION,
                        payload: { location: response }
                    });
                }
            }
        });
    };
};