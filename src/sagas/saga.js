import { all, take, takeLatest, put, select, fork, cancel, cancelled, delay } from 'redux-saga/effects';
import getScreenState from '../reducers/screenReducer';
// const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* changeStatusAsync({ payload }) {
    yield put({ type: 'CHANGE_STATUS', payload: payload });
}

function* watchChangeStatus(payload) {
    yield takeLatest('CHANGE_STATUS_ASYNC', changeStatusAsync);
}

export function* bgSync() {
    const state = yield select(getScreenState);
    let idleTime = state.screen.idleTime;
    let submitTime = state.screen.submitTime;
    try {
        yield put({type: 'START_IDLE_TIMING'});
        while (true) {
            idleTime++;
            if (idleTime > 4) {
                idleTime = 0;
                yield put({ type: 'GO_IDLE'});
                yield put({ type: 'STOP_BACKGROUND_SYNC' });
            }
            submitTime++;
            if (submitTime > 1 && state.screen.status.length === 6) {
                console.log('Process input');
                yield put({ type: 'RESET_SUBMIT_TIME' });
            }
            yield delay(1000)
        }
    } finally {
        // if (yield cancelled())
    }
}

function* watchBgSyncTask() {
    while (yield take('START_IDLE_TIMING')) {
        const bgSyncTask = yield fork(bgSync)

        yield take('STOP_BACKGROUND_SYNC')

        yield cancel(bgSyncTask)
    }
}
export default function* rootSaga() {
    yield all([
        watchChangeStatus(),
        watchBgSyncTask()
    ])
}