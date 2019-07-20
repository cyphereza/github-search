import React from 'react';

class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      totalSearchResults: 0,
      perPage: 0,
    };
  }

  setPaginationVariables = async (totalSearchResults, currentPage, perPage) => {
    await this.setState({
      totalSearchResults,
      currentPage,
      perPage,
    });
  };

  changeCurrentPage = currentPage => {
    this.setState({ currentPage });
  };

  calculatePages = (totalSearchResults, perPage) => {
    if (totalSearchResults === 0 || perPage === 0) return 0;
    return Math.ceil(totalSearchResults / perPage);
  };

  handlePagination = () => {
    var maxPages = this.calculatePages(this.state.totalSearchResults, this.state.perPage);
    if (maxPages > 100) maxPages = 100;
    return (
      <div>
        Pagination! {this.state.currentPage} / {maxPages}
      </div>
    );
  };

  render() {
    if (this.calculatePages(this.state.totalSearchResults, this.state.perPage) === 0) return null;
    else return this.handlePagination();
  }
}

export default Pagination;
