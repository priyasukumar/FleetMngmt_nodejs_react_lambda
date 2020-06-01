import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/Index';
import apiMiddleware from './middleware/api';
import thunk from 'redux-thunk';

const middleware = [thunk, apiMiddleware];

export default createStore(rootReducer, {}, applyMiddleware(...middleware));
