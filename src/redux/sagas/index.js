import { all, fork } from 'redux-saga/effects';
import search from './search';

export default function* rootSagas() {
  yield all([fork(search)]);
}
