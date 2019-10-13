import { createSelector } from 'reselect';

export const selectResultsQuery = state => state.search.query;

export const makeSelectResultsQuery = () =>
  createSelector(
    selectResultsQuery,
    state => state
  );
export const selectResultsData = state => state.search.data;

export const makeSelectResultsData = () =>
  createSelector(
    selectResultsData,
    state => state
  );

export const selectResultsTotalCount = state => state.search.totalSearchResults;

export const makeSelectResultsTotalCount = () =>
  createSelector(
    selectResultsTotalCount,
    state => state
  );

export const selectResultsIsSearching = state => state.search.isSearching;

export const makeSelectResultsIsSearching = () =>
  createSelector(
    selectResultsIsSearching,
    state => state
  );

export const selectResultsCurrentPage = state => state.search.currentPage;

export const makeSelectResultsCurrentPage = () =>
  createSelector(
    selectResultsCurrentPage,
    state => state
  );

export const selectResultsPerPage = state => state.search.perPage;

export const makeSelectResultsPerPage = () =>
  createSelector(
    selectResultsPerPage,
    state => state
  );
