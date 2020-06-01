import { combineReducers } from 'redux';
import DashboardReducer from './DashboardReducer';

export default combineReducers({
  dashboard: DashboardReducer
});
