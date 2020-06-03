import { API, UPDATE_DRIVER_SERVICE_TIME } from '../constants/Actions';
import { Http } from '../constants/enum';

export const loadDriversServiceTime = () => {
    return (dispatch: any) => {
        dispatch({
            type: API,
            payload: {
                url: '/DriverServiceTime',
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