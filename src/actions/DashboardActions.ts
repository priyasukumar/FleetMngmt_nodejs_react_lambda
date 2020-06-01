import { UPDATE_DASHBOARD, API } from '../constants/Actions';
import { Http } from '../constants/enum';

export const loadDashboard = () => {
    return (dispatch: any) => {
        dispatch({
            type: API,
            payload: {
                url: '/Prod/harshdrive?name=harshbreak%20&interval=week',
                method: Http.Get,
                onSuccess: (response: any) => {
                    dispatch({
                        type: UPDATE_DASHBOARD,
                        payload: { data: response }
                    });
                }
            }
        });
    };
};