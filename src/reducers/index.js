import { combineReducers } from 'redux';
import safeReducer from './safeReducer';
import screenReducer from './screenReducer';

export default combineReducers({
    safe: safeReducer,
    screen: screenReducer
});