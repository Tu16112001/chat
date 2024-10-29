import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // Import redux-thunk middleware
import notificationReducer from './notificationReducer';
import authReducer from './authReducer';

// Kết hợp tất cả các reducers
const rootReducer = combineReducers({
  notifications: notificationReducer,
  auth: authReducer,
});

// Tạo store Redux với redux-thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
