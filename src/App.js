import React from 'react';
import './App.css';
import SearchInput from './component/searchinput';
import SearchOutput from './component/searchoutput';
import Pagination from './component/pagination';
import * as searchActions from './redux/ducks/search';
import { connect } from 'react-redux';
import { makeSelectResultsCurrentPage, makeSelectResultsQuery } from './redux/selectors/results';
import { createStructuredSelector } from 'reselect';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      currentPage: 1,
      totalSearchResults: 0,
      perPage: 10,
    };
  }

  componentDidMount = () => {
    let params = new URLSearchParams(window.location.search);
    let query = params.get('q');

    if (query && query !== '') {
      let currentPage = parseInt(params.get('page'));

      if (!currentPage || currentPage < 1) {
        currentPage = 1;
      } else if (currentPage > 100) {
        currentPage = 100;
      }

      this.doSearch(query, currentPage);
    }
  };

  handleSubmit = query => {
    console.log(query + ' submitted');
    if (query === '') {
      return;
    }
    this.doSearch(query, 1);
    window.history.pushState('string', 'Github Search', '?q=' + query + '&page=' + 1);
  };

  doSearch = (query, currentPage) => {
    let perPage = this.props.perPage;

    if (perPage === 0 || typeof perPage === 'undefined') {
      perPage = 10;
      this.props.changePerPage(perPage);
    }

    this.props.startSearch({ query, currentPage, perPage });
  };

  render() {
    return (
      <div className="App">
        <div className="container-fluid bg-white border p-3 mb-3">
          <SearchInput onSubmit={this.handleSubmit} />
          <SearchOutput />
          <Pagination />
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentPage: makeSelectResultsCurrentPage(),
  query: makeSelectResultsQuery(),
});

const mapDispatchToProps = {
  startSearch: searchActions.startSearch,
  changePage: searchActions.changePage,
  changePerPage: searchActions.changePerPage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
