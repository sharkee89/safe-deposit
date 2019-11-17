import { all, call, cancel, fork, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects';
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
                state.screen.locked === Config.screenLocked.LOCK) {
                yield put({ type: 'RESET_SUBMIT_TIME' });
                yield put({ type: 'PROCESS_INPUT_ASYNC', payload: state.screen.status });
                yield put({ type: 'STOP_BACKGROUND_SYNC' });
                
            }
            if (submitTime > 1 && state.screen.serviceMode && state.screen.locked === Config.screenLocked.LOCK) {
                yield put({ type: 'CHANGE_STATUS', payload: Config.screenStatus.VALIDATE });
                yield put({ type: 'START_SERVICE_WORK', payload: state.screen.status });
                yield put({ type: 'STOP_BACKGROUND_SYNC' });
            }
            yield delay(1000)
        }
    } finally {
        // if (yield cancelled())
    }
}

function* serviceWork({ payload }) {
    yield delay(1500);
    try {
        const response = yield call(fetch, `${Config.serviceUrl}${payload}`);
        const responseBody = response.json();
        lockSound.play();
        yield put({ type: 'UNLOCK_SUCCESS' });
    } catch (e) {
        errorSound.play();
        yield put({ type: 'UNLOCK_FAIL' });
        return;
    }
}

function* watchStartServiceWork() {
    yield takeEvery('START_SERVICE_WORK', serviceWork);
}

function* watchBgSyncTask() {
    while (yield take('START_IDLE_TIMING')) {
        const bgSyncTask = yield fork(bgSync)

        yield take('STOP_BACKGROUND_SYNC')

        yield cancel(bgSyncTask)
    }
}

function* processInput({ payload }) {
    yield delay(1500);
    if (payload === Config.serviceCode) {
        yield put({ type: 'START_SERVICE' });
        return;
    }
    yield call(checkPassword, [payload, 'UNLOCK_SUCCESS', 'LOCK_FAIL']);
}

function* watchProcessInput() {
    yield takeEvery('PROCESS_INPUT_ASYNC', processInput);
}

function* unlockSuccess() {
    yield call(lock, [true, Config.screenLocked.UNLOCK]);
}

function* watchUnlockSuccess() {
    yield takeEvery('UNLOCK_SUCCESS', unlockSuccess);
}

function* unlockFail() {
    yield call(lock, [false, Config.screenLocked.UNLOCK]);
}

function* watchUnlockFail() {
    yield takeEvery('UNLOCK_FAIL', unlockFail);
}

function* checkPassword(payload) {
    if (payload[0] === Config.password) {
        lockSound.play();
        yield put({ type: payload[1] });
    } else {
        errorSound.play();
        yield put({ type: payload[2] });
    }
}

function* startLock({ payload }) {
    yield delay(1500);
    if (payload.length !== 6) {
        errorSound.play();
        yield put({ type: 'LOCK_FAIL' });
        return;
    }
    yield call(checkPassword, [payload, 'LOCK_SUCCESS', 'LOCK_FAIL']);
}

function* watchStartLock() {
    yield takeEvery('START_LOCK_ASYNC', startLock)
}

function* watchLockSuccess() {
    yield takeEvery('LOCK_SUCCESS', lockSuccess);
}

function* watchLockFail() {
    yield takeEvery('LOCK_FAIL', lockFail);
}

function* lockSuccess() {
    yield call(lock, [true, Config.screenLocked.LOCK]);
}

function* lockFail() {
    yield call(lock, [false, Config.screenLocked.LOCK]);
}

function* lock(params) {
    yield delay(1500);
    if (params[0]) {
        yield put({type: 'CHANGE_LOCK', payload: params[1]});
    }
    yield put({type: 'GO_IDLE'});
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
        watchLockFail(),
        watchStartServiceWork()
    ])
}