import React from 'react';
import './App.css';
import SearchInput from './component/searchinput';
import SearchOutput from './component/searchoutput';
import Pagination from './component/pagination';
import * as searchActions from './redux/ducks/search';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.searchInputRef = React.createRef();
    this.searchOutputRef = React.createRef();
    this.paginationRef = React.createRef();

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
    let perPage = this.state.perPage;

    if (query && query !== '') {
      let currentPage = parseInt(params.get('page'));

      if (!currentPage || currentPage < 1) {
        currentPage = 1;
      } else if (currentPage > 100) {
        currentPage = 100;
      }

      this.setState({ query, currentPage }, () => {
        this.props.startSearch({ query, currentPage, perPage });
        window.history.pushState('string', 'Github Search', '?q=' + query + '&page=' + this.state.currentPage);
      });
    }
  };

  handleSubmit = async query => {
    if (query === '') {
      return;
    }
    this.setState({ query, currentPage: 1 }, () => {
      this.doSearch();
      window.history.pushState('string', 'Github Search', '?q=' + query + '&page=' + this.state.currentPage);
    });
  };

  doSearch = async () => {
    let query = this.state.query;
    let currentPage = this.state.currentPage;
    let perPage = this.state.perPage;

    this.props.startSearch({ query, currentPage, perPage });
  };

  handlePageChange = async pageNumber => {
    await this.setState({ currentPage: pageNumber }, () => {
      let params = new URLSearchParams(window.location.search);
      let query = params.get('q');

      this.doSearch();
      window.history.pushState('string', 'Github Search', '?q=' + query + '&page=' + this.state.currentPage);
    });
  };

  render() {
    return (
      <div className="App">
        <div className="container-fluid bg-white border p-3 mb-3">
          <SearchInput onSubmit={this.handleSubmit} ref={this.searchInputRef} />
          <SearchOutput />
          <Pagination />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  startSearch: searchActions.startSearch,
};

export default connect(
  null,
  mapDispatchToProps
)(App);
