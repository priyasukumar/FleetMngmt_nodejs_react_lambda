import { UPDATE_FUEL } from '../constants/Actions';
import { IFuelContainerProps } from '../models/fuelUsage';

const initialState = {
    fuel: []
} as IFuelContainerProps;

const FuelReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case UPDATE_FUEL:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default FuelReducer;
