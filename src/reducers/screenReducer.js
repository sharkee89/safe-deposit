import Config from '../config/config';
import { 
    CHANGE_STATUS,
    START_IDLE_TIMING,
    GO_IDLE,
    RESET_SUBMIT_TIME,
    PROCESS_INPUT_ASYNC,
    CHANGE_LOCK,
    UNLOCK_SUCCESS,
    UNLOCK_FAIL,
    LOCK_SUCCESS,
    LOCK_FAIL,
    START_LOCK_ASYNC
} from '../actions/types';
import { statement } from '@babel/template';

const initialState = {
    locked: Config.screenLocked.LOCK,
    status: Config.screenStatus.READY,
    on: false,
    progress: false,
    idleTime: 0,
    submitTime: 0
}

export default (state = initialState, action) => {
    switch (action && action.type) {
        case CHANGE_STATUS:
            return {
                ...state,
                status: action.payload,
                on: true
            }
        case START_IDLE_TIMING:
            return {
                ...state,
                progress: true,
                idleTime: 0,
                submitTime: 0
            }
        case GO_IDLE:
            return {
                ...state,
                on: false,
                progress: false,
                status: Config.screenStatus.READY,
                idleTime: 0,
                submitTime: 0
            }
        case RESET_SUBMIT_TIME:
            return {
                ...state,
                submitTime: 0
            }
        case PROCESS_INPUT_ASYNC:
            return {
                ...state,
                status: Config.screenStatus.VALIDATE
            };
        case CHANGE_LOCK:
            return {
                ...state,
                locked: action.payload
            }
        case UNLOCK_SUCCESS:
            return {
                ...state,
                status: Config.screenStatus.UNLOCK
            }
        case UNLOCK_FAIL:
            return {
                ...state,
                status: Config.screenStatus.ERROR
            }
        case START_LOCK_ASYNC:
            return {
                ...state,
                status: Config.screenStatus.VALIDATE
            };
        case LOCK_SUCCESS:
            return {
                ...state,
                status: Config.screenStatus.LOCK
            }
        case LOCK_FAIL:
            return {
                ...state,
                status: Config.screenStatus.ERROR
            }
        default:
            return state;
    }
}

export const getScreenState = (state) => state;