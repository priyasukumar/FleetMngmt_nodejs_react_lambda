import axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from '../utils/environment';
import { Http } from '../constants/enum';
import { API, API_TRANSACTION } from '../constants/Actions';
import { apiStart, showApiFailure, showApiSuccess, apiEnd } from '../actions/ApiStatus';
import { MessageConstants } from '../constants/MessageConstants';

const apiMiddleware = ({ dispatch }: { dispatch: any }) => (next: any) => (action: any) => {
    next(action);

    if (action.type !== API) {
        return;
    }

    const { url, method, data, onSuccess, onFailure } = action.payload;
    const dataOrParams = [Http.Get, Http.Delete].includes(method) ? 'params' : 'data';
    let apiUrl = `${API_URL}${url}`;

    // axios default configs

    // axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
    // axios.defaults.headers['Access-Control-Allow-Credentials'] = true;
    // axios.defaults.headers.common['Content-Type'] = 'application/json';
    // response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers';
    axios.defaults.headers.common['content-type'] = 'application/json';
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    const axiosRequestConfig = {
        url: apiUrl, method, [dataOrParams]: data,
        headers: {
            common: {
                'Accept': 'application/json',
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE'
            }

        }
    } as AxiosRequestConfig;
    dispatch(apiStart());

    axios
        .request(axiosRequestConfig)
        .then((response: any) => {
            if (response.data.error) {
                if (action.type === API_TRANSACTION) {
                    dispatch(showApiFailure(response.data.error));
                }
                if (onFailure) {
                    onFailure();
                }
                return;
            }
            if (action.type === API_TRANSACTION) {
                dispatch(showApiSuccess(response.data.error));
            }
            if (onSuccess) {
                onSuccess(response.data);
            }
        })
        .catch(error => {
            if (error.message === 'Network Error') {
                dispatch(showApiFailure(MessageConstants.SERVER_ERROR));
                return;
            }
            if (action.type === API_TRANSACTION) {
                dispatch(showApiFailure(error));
            }
            if (onFailure) {
                onFailure();
            }
            if (error.isAxiosError) {
                dispatch(showApiFailure(error.message));
            }
        })
        .finally(() => {
            dispatch(apiEnd());
        });
};

export default apiMiddleware;
