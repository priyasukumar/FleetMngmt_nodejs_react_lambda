import { UPDATE_HARSHTURN } from '../constants/Actions';
import { IHarshTurnContainerProps } from '../models/harshTurn';

const initialState = {
    harshTurn: []
} as IHarshTurnContainerProps;

const HarshTurnReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case UPDATE_HARSHTURN:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default HarshTurnReducer;
