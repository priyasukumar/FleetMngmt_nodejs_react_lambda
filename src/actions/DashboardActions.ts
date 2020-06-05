import { UPDATE_DASHBOARD, API } from '../constants/Actions';
import { Http } from '../constants/enum';

export const loadDashboard = () => {
    return (dispatch: any) => {
        dispatch({
            type: API,
            payload: {
                url: '/drivinginsights?from=2020-04-01%2008:45:00&to=2020-04-30%2009:00:00',
                method: Http.Get,
                onSuccess: (response: any) => {
                    dispatch({
                        type: UPDATE_DASHBOARD,
                        payload: { dashboard: response }
                    });
                }
            }
        });
    };
};