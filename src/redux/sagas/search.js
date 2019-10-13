import { takeLatest, fork, all, put } from 'redux-saga/effects';
import { SEARCH_START, searchSuccess, searchFailed } from '../ducks/search';
import { API } from '../../constant';
import { httpService } from '../../services';

function* startSearch({ query, perPage, currentPage }) {
  try {
    var url = API.endpoints.searchRepositories + '?q=' + query + '&per_page=' + perPage + '&page=' + currentPage;
    let apiCall = httpService.get(url);

    let response;

    yield apiCall.then(result => {
      response = result;
    });

    if (response.status === 200) {
      yield put(searchSuccess(response.data.total_count, response.data.items));
    } else {
      yield put(searchFailed('Status not 200'));
    }
  } catch (error) {
    yield console.log(error);
    yield put(searchFailed(error));
  }
}

function* watchSearch() {
  yield takeLatest(SEARCH_START, startSearch);
}

export default function* search() {
  yield all([fork(watchSearch)]);
}
