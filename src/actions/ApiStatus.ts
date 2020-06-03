import { API_END, API_START, SHOW_FAILURE_MESSAGE, SHOW_SUCCESS_MESSAGE } from '../constants/Actions';
import * as rrs from 'react-redux-spinner';

export const apiStart = () => ({
    type: API_START,
    [rrs.pendingTask]: rrs.begin
});

export const apiEnd = () => ({
    type: API_END,
    [rrs.pendingTask]: rrs.end
});

export const showApiFailure = (error: string) => ({
    type: SHOW_FAILURE_MESSAGE,
    payload: error
});

export const showApiSuccess = (error: string) => ({
    type: SHOW_SUCCESS_MESSAGE,
    payload: error
});
