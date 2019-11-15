import Config from '../config/config';
import { CHANGE_STATUS, START_IDLE_TIMING, GO_IDLE, RESET_SUBMIT_TIME } from '../actions/types';

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
        default:
            return state;
    }
}

export const getScreenState = (state) => state;