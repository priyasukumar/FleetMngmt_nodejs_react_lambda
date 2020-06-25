import { UPDATE_PAGINATION_ROW_COUNT } from '../constants/Actions';

const initialState :any = {
   rowCount: 5
}

const PaginationReducer = (state = initialState, action :any ) => {
    switch (action.type) {
        case UPDATE_PAGINATION_ROW_COUNT:
            return Object.assign(
                {},
                state,
                {rowCount:action.payload}
            )
        default:
            return state;
    }
};

export default PaginationReducer;
