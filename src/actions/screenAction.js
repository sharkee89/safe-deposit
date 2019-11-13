import { GET_SCREEN_INIT, CHANGE_STATUS } from './types';

export const getScreenInit = () => dispatch => {
    dispatch({
        type: GET_SCREEN_INIT
    });
}

export const changeStatus = (value) => dispatch => {
    console.log(`${value} in action`);
    dispatch({
        type: CHANGE_STATUS,
        payload: value
    });
}

