import axios, { AxiosRequestConfig } from 'axios';
import { API_URL, BASE_URL } from '../utils/environment';
import { Http } from '../constants/enum';
import { API } from '../constants/Actions';

const apiMiddleware = ({ dispatch }: { dispatch: any }) => (next: any) => (action: any) => {
    next(action);

    if (action.type !== API) {
        return;
    }
    
    const { url, method, data, onSuccess, onFailure } = action.payload;
    const dataOrParams = [Http.Get, Http.Delete].includes(method) ? 'params' : 'data';
    const apiUrl = `https://www.googleapis.com/customsearch/v1`;

    // axios default configs
    axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    const axiosRequestConfig = { url: apiUrl, method, [dataOrParams]: data } as AxiosRequestConfig;
    axios
        .request(axiosRequestConfig)
        .then((response: any) => {
            if (response.data.error) {
                if (onFailure) {
                    onFailure();
                }
                return;
            }
            if (onSuccess) {
                onSuccess(response.data);
            }
        })
        .catch(error => {
            if (onFailure) {
                onFailure();
            }
        });
};

export default apiMiddleware;
