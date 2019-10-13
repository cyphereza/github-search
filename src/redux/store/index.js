import { applyMiddleware, createStore } from 'redux';
import rootReducers from '../ducks';
import rootSagas from '../sagas';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

let store;
let createAppStore;

const logger = createLogger({
  collapsed: true,
  stateTransformer(state) {
    return state;
  },
});

// const store = createStore(searchReducer, applyMiddleware(logger, sagaMiddleware));
createAppStore = applyMiddleware(sagaMiddleware, logger)(createStore);

// Redux store
const configureStore = () => {
  store = createAppStore(rootReducers);
  sagaMiddleware.run(rootSagas);
  return store;
};

export const getStore = () => store;

export default configureStore;
