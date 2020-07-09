import { UPDATE_LOCATION } from '../constants/Actions';
import { ILocationContainerProps } from '../models/location';

const initialState = {
    location: []
} as unknown as ILocationContainerProps;

const LocationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case UPDATE_LOCATION:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default LocationReducer;
