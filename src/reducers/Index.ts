import { combineReducers } from 'redux';
import DashboardReducer from './DashboardReducer';
import { pendingTasksReducer as PendingTasksReducer } from 'react-redux-spinner';
import { reducer as ToastrReducer } from 'react-redux-toastr';
import DriverServiceTimeReducer from './DriverServiceTimeReducer';
import OverSpeedReducer from './OverSpeedReducer';
import HarshBrakeReducer from './HarshBrakeReducer';
import HarshTurnReducer from './HarshTurnReducer';
import DateReducer from './DateReducer';
import PaginationReducer from './PaginationReducer';
import LocationReducer from './LocationReducer';
import FuelReducer from './FuelUsageReducer';

export default combineReducers({
  dashboard: DashboardReducer,
  overSpeed: OverSpeedReducer,
  harshBrake: HarshBrakeReducer,
  harshTurn: HarshTurnReducer,
  driversServiceTime: DriverServiceTimeReducer,
  pendingTasks: PendingTasksReducer,
  toastr: ToastrReducer,
  date: DateReducer,
  rowCount: PaginationReducer,
  location: LocationReducer,
  fuel: FuelReducer
});
