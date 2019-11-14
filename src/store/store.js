import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

import createSagaMiddleware from 'redux-saga';
import { watchChangeStatus } from '../sagas/saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
                rootReducer, 
                compose (
                    applyMiddleware(sagaMiddleware),
                    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                )
            )

sagaMiddleware.run(watchChangeStatus);

export default store;