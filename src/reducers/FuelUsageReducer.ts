import { IFuelModel } from '../models/fuelUsage';
import { UPDATE_FUEL } from '../constants/Actions';

const initialState = {
    fuel: {}
} as IFuelModel;

const FuelUsageReducer = (state = initialState, action: any) => {
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

export default FuelUsageReducer;