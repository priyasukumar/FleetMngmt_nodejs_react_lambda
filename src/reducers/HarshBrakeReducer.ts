import { UPDATE_HARSHBRAKE } from '../constants/Actions';
import { IHarshBrakeContainerProps } from '../models/harshBrake';

const initialState = {
    harshBrake: []
} as IHarshBrakeContainerProps;

const HarshBrakeReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case UPDATE_HARSHBRAKE:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default HarshBrakeReducer;
