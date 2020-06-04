import { UPDATE_DASHBOARD, API } from '../constants/Actions';
import { Http } from '../constants/enum';

export const loadDashboard = () => {
    return (dispatch: any) => {
        dispatch({
            type: API,
            payload: {
                url: '/drivinginsights',
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