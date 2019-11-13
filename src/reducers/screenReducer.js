// import { TEST_ACTION } from '../actions/types';
import Config from '../config/config';
import { GET_SCREEN_INIT, CHANGE_STATUS } from '../actions/types';

const initialState = {
    locked: Config.screenLocked.LOCK,
    status: Config.screenStatus.READY,
    on: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_STATUS:
            return {
                ...state,
                status: action.payload,
                on: true
            }
        default:
            return state;
    }
}