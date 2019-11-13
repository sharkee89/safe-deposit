import { TEST_ACTION } from './types';

export const testAction = () => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(res => res.json())
        .then(data => dispatch({
            type: TEST_ACTION,
            payload: data
        })
    );
}