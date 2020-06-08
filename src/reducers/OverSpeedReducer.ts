import { UPDATE_OVERSPEED } from '../constants/Actions';
import { IOverSpeedContainerProps } from '../models/overSpeed';

const initialState = {
    overSpeed: []
} as IOverSpeedContainerProps;

const OverSpeedReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case UPDATE_OVERSPEED:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default OverSpeedReducer;
