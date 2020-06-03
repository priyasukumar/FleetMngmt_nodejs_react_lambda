import { SHOW_FAILURE_MESSAGE } from '../constants/Actions';
import { toastr } from 'react-redux-toastr';
import { MessageConstants } from '../constants/MessageConstants';

const messageMiddleware = () => (next: any) => (action: any) => {
    switch (action.type) {
        case SHOW_FAILURE_MESSAGE:
            if (action.payload) {
                toastr.error('', action.payload);
                return;
            }
            toastr.error('', MessageConstants.FAILURE_MESSAGE);
            break;
        default:
            break;
    }
    next(action);
};

export default messageMiddleware;
