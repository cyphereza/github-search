const namespace = 'SEARCH';

// Initial states
const initialState = {
  query: '',
  currentPage: 1,
  totalSearchResults: 0,
  isSearching: false,
  error: null,
  data: null,
  perPage: 0,
};

// Action Types
export const SEARCH_START = `${namespace}/SEARCH_START`;
export const SEARCH_SUCCESS = `${namespace}/SEARCH_SUCCESS`;
export const SEARCH_FAILED = `${namespace}/SEARCH_FAILED`;
export const CHANGE_PAGE = `${namespace}/CHANGE_PAGE`;
export const SEARCH_RESET = `${namespace}/SEARCH_RESET`;

// Action creators
export const startSearch = ({ query, currentPage, perPage }) => ({
  type: SEARCH_START,
  query,
  currentPage,
  perPage,
});

export const searchSuccess = (totalSearchResults, data) => ({
  type: SEARCH_SUCCESS,
  totalSearchResults,
  data,
});

export const searchFailed = error => ({
  type: SEARCH_FAILED,
  error,
});

export const changePage = currentPage => ({
  type: CHANGE_PAGE,
  currentPage,
});

export const resetSearch = () => ({
  type: SEARCH_RESET,
});

// Reducers - changes the states
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SEARCH_START:
      return Object.assign({}, state, {
        query: action.query,
        currentPage: action.currentPage,
        isSearching: true,
        perPage: action.perPage,
        error: null,
      });
    case SEARCH_SUCCESS:
      return Object.assign({}, state, {
        isSearching: false,
        totalSearchResults: action.totalSearchResults,
        data: action.data,
        error: null,
      });
    case SEARCH_FAILED:
      return Object.assign({}, state, {
        isSearching: false,
        error: action.error,
      });
    case CHANGE_PAGE:
      return Object.assign({}, state, {
        currentPage: action.currentPage,
      });
    case SEARCH_RESET:
      return Object.assign({}, state, {
        query: '',
        isSearching: false,
        totalSearchResults: 0,
        currentPage: 1,
        error: null,
        perPage: 0,
      });
    default:
      return state;
  }
}
