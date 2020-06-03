import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/Index';
import apiMiddleware from './middleware/api';
import messageMiddleware from './middleware/Message';
import thunk from 'redux-thunk';

const middleware = [thunk, apiMiddleware, messageMiddleware];

export default createStore(rootReducer, {}, applyMiddleware(...middleware));
