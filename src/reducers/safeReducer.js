import { TEST_ACTION } from '../actions/types';

const initialState = {
    name: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TEST_ACTION:
            return {
                ...state,
                name: action.payload
            }
        default:
            return state;
    }
}