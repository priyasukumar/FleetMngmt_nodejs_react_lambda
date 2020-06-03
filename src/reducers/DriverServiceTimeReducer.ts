import { UPDATE_DRIVER_SERVICE_TIME } from '../constants/Actions';
import { IDriverServiceTimeProps } from '../models/driverServiceTime';

const initialState = {
    driversServiceTime: []
} as IDriverServiceTimeProps;

const DriverServiceTimeReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case UPDATE_DRIVER_SERVICE_TIME:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default DriverServiceTimeReducer;
