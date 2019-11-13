import { takeEvery, put } from 'redux-saga/effects';
import { changeStatus } from "../actions/screenAction";

function* changeStatusAsync() {
    yield delay(4000);
    yield put({type: 'CHANGE_STATUS_ASYNC', payload: 13});
}

export function* watchChangeStatus() {
    yield takeEvery ('CHANGE_STATUS', changeStatus);
}