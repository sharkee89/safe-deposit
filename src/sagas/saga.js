// import { delay } from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';

function* changeStatusAsync({ payload }) {
    // yield delay(4000);
    yield put({type: 'CHANGE_STATUS_ASYNC', payload: payload});
}

export function* watchChangeStatus() {
    yield takeEvery ('CHANGE_STATUS', changeStatusAsync);
}