import React from 'react';
import './App.css';
import SearchInput from './component/searchinput';
import SearchOutput from './component/searchoutput';
import Pagination from './component/pagination';

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
      this.setState({ query, currentPage }, () => {
        this.searchInputRef.current.setSearchQuery(query, currentPage); // Set the input box to URL param's q value
        this.doSearch();
        window.history.pushState('string', 'Github Search', '?q=' + query + '&page=' + this.state.currentPage);
      });
    }
  };

  handleSubmit = async query => {
    if (query === '') {
      return;
    }
    console.log('Handle Submit in App, query = ' + query);
    this.setState({ query, currentPage: 1 }, () => {
      this.doSearch();
      window.history.pushState('string', 'Github Search', '?q=' + query + '&page=' + this.state.currentPage);
    });
  };

  doSearch = async () => {
    console.log('Do search...');
    console.log('Searching for ' + this.state.query);
    await this.searchOutputRef.current
      .setSearchQuery(this.state.query, this.state.currentPage)
      .then(() => {
        this.setState({ totalSearchResults: this.searchOutputRef.current.getTotalSearchResults() });
      })
      .then(() => {
        this.paginationRef.current.setPaginationVariables(this.state.totalSearchResults, this.state.currentPage, 10);
      });
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
          <SearchOutput ref={this.searchOutputRef} />
          <Pagination totalSearchResults={this.state.totalSearchResults} ref={this.paginationRef} />
        </div>
      </div>
    );
  }
}

export default App;
