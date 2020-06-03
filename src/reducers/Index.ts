import { combineReducers } from 'redux';
import DashboardReducer from './DashboardReducer';
import { pendingTasksReducer as PendingTasksReducer } from 'react-redux-spinner';
import { reducer as ToastrReducer } from 'react-redux-toastr';
import DriverServiceTimeReducer from './DriverServiceTimeReducer';

export default combineReducers({
  dashboard: DashboardReducer,
  driversServiceTime: DriverServiceTimeReducer,
  pendingTasks: PendingTasksReducer,
  toastr: ToastrReducer,
});
