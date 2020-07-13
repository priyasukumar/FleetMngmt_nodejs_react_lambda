import { UPDATE_FUEL_DATE } from '../constants/Actions';

const initialToDate = new Date();
initialToDate.setDate(initialToDate.getDate()-30);

const initialState :any = {
    currentDate : new Date(),
    initialToDate: initialToDate
}

const FuelDateReducer = (state = initialState, action :any ) => {
    switch (action.type) {
        case UPDATE_FUEL_DATE:
            return Object.assign(
                {},
                state,
                {currentDate:action.payload.currentDate,initialToDate:action.payload.initialToDate}
            )
        default:
            return state;
    }
};

export default FuelDateReducer;
