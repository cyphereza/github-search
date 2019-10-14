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
export const CHANGE_PER_PAGE = `${namespace}/CHANGE_PER_PAGE`;

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

export const changePerPage = perPage => ({
  type: CHANGE_PER_PAGE,
  perPage,
});

export const resetSearch = () => ({
  type: SEARCH_RESET,
});

// Reducers - changes the states
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SEARCH_START:
      console.log(`In search start redux: ${JSON.stringify(action)}`);
      return {
        ...state,
        query: action.query,
        currentPage: action.currentPage,
        isSearching: true,
        perPage: action.perPage,
        error: null,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        isSearching: false,
        totalSearchResults: action.totalSearchResults,
        data: action.data,
        error: null,
      };
    case SEARCH_FAILED:
      return {
        ...state,
        isSearching: false,
        error: action.error,
      };
    case CHANGE_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case CHANGE_PER_PAGE:
      console.log(`In change per page redux: ${JSON.stringify(action)}`);
      return {
        ...state,
        perPage: action.perPage,
      };
    case SEARCH_RESET:
      return {
        ...state,
        query: '',
        isSearching: false,
        totalSearchResults: 0,
        currentPage: 1,
        error: null,
        perPage: 0,
      };
    default:
      return state;
  }
}
