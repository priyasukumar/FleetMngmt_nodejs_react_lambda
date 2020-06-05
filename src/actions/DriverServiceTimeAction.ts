import { API, UPDATE_DRIVER_SERVICE_TIME } from '../constants/Actions';
import { Http } from '../constants/enum';

export const loadDriversServiceTime = () => {
    return (dispatch: any) => {
        dispatch({
            type: API,
            payload: {
                url: '/driverservice?from=2020-04-20%2007:40:00&to=2020-05-30%2007:40:40',
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