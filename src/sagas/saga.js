import { all, take, takeLatest, takeEvery, put, select, fork, cancel } from 'redux-saga/effects';
import getScreenState from '../reducers/screenReducer';
import Config from '../config/config';
import lockSoundFile from '../audio/unlock.wav';
import errSoundFile from '../audio/error.mp3';

const lockSound = new Audio(lockSoundFile);
const errorSound = new Audio(errSoundFile);

const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* changeStatusAsync({ payload }) {
    yield put({ type: 'CHANGE_STATUS', payload: payload });
}

function* watchChangeStatus() {
    yield takeLatest('CHANGE_STATUS_ASYNC', changeStatusAsync);
}

function* bgSync() {
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
            if (submitTime > 1 && state.screen.status.length === 6 &&
                state.screen.locked !== Config.screenLocked.UNLOCK) {
                yield put({ type: 'RESET_SUBMIT_TIME' });
                yield put({ type: 'PROCESS_INPUT_ASYNC' });
                yield put({ type: 'STOP_BACKGROUND_SYNC' });
                
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

function* processInput() {
    yield delay(1500);
    const random = Math.round(Math.random());
    if (random === 1) {
        lockSound.play();
        yield put({ type: 'UNLOCK_SUCCESS' });
    } else {
        errorSound.play();
        yield put({ type: 'UNLOCK_FAIL' });
    }
}

function* watchProcessInput() {
    yield takeEvery('PROCESS_INPUT_ASYNC', processInput);
}

function* unlockSuccess() {
    yield delay(1500);
    yield put({type: 'CHANGE_LOCK', payload: Config.screenLocked.UNLOCK});
    yield put({type: 'GO_IDLE'});
}

function* watchUnlockSuccess() {
    yield takeEvery('UNLOCK_SUCCESS', unlockSuccess);
}

function* unlockFail() {
    yield delay(1500);
    yield put({type: 'GO_IDLE'});
}

function* watchUnlockFail() {
    yield takeEvery('UNLOCK_FAIL', unlockFail);
}

function* startLock({ payload }) {
    yield delay(1500);
    const random = Math.round(Math.random());
    if (random === 1) {
        lockSound.play();
        yield put({ type: 'LOCK_SUCCESS' });
    } else {
        errorSound.play();
        yield put({ type: 'LOCK_FAIL' });
    }
}

function* watchStartLock() {
    yield takeEvery('START_LOCK_ASYNC', startLock)
}

function* lockSuccess() {
    yield delay(1500);
    yield put({type: 'CHANGE_LOCK', payload: Config.screenLocked.LOCK});
    yield put({type: 'GO_IDLE'});
}

function* watchLockSuccess() {
    yield takeEvery('LOCK_SUCCESS', lockSuccess);
}

function* lockFail() {
    yield delay(1500);
    yield put({type: 'GO_IDLE'});
}

function* watchLockFail() {
    yield takeEvery('LOCK_FAIL', lockFail);
}

export default function* rootSaga() {
    yield all([
        watchChangeStatus(),
        watchBgSyncTask(),
        watchProcessInput(),
        watchUnlockSuccess(),
        watchUnlockFail(),
        watchStartLock(),
        watchLockSuccess(),
        watchLockFail()
    ])
}