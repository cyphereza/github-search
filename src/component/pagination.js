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
    let maxPages = this.calculatePages(this.state.totalSearchResults, this.state.perPage);
    let params = new URLSearchParams(window.location.search);
    let q = params.get('q');
    let currentPage = parseInt(params.get('page'));
    let numbers = [];

    if (maxPages > 100) maxPages = 100;

    numbers.push('<');
    for (let i = 0; i < maxPages; i++) {
      numbers.push(i + 1);
    }
    numbers.push('>');

    return (
      <div className="pagination d-flex justify-content-center pt-3">
        {numbers.map((item, key) => {
          let url = '/?q=' + q;
          if (item === '<') {
            let calculatedKey = currentPage - 1;
            if (calculatedKey < 1) calculatedKey = 1;
            if (calculatedKey === this.state.currentPage)
              return (
                <a href={url + '&page=' + calculatedKey + '#'} key={key} className="inactive">
                  {item}
                </a>
              );
            url += '&page=' + calculatedKey;
          } else if (item === '>') {
            let calculatedKey = currentPage + 1;
            if (calculatedKey > maxPages) calculatedKey = maxPages;
            if (calculatedKey === this.state.currentPage)
              return (
                <a href={url + '&page=' + calculatedKey + '#'} key={key} className="inactive">
                  {item}
                </a>
              );
            url += '&page=' + calculatedKey;
          } else {
            url += '&page=' + item;
          }

          if (this.state.currentPage === item) {
            return (
              <a href={url + '#'} key={key} className="active">
                {item}
              </a>
            );
          }
          if (
            (this.state.currentPage - item === 3 &&
              item !== 1 &&
              item !== 2 &&
              this.state.currentPage !== 1 &&
              this.state.currentPage !== 2) ||
            (item - this.state.currentPage === 3 &&
              item !== maxPages &&
              item !== maxPages - 1 &&
              this.state.currentPage !== maxPages &&
              this.state.currentPage !== maxPages - 1)
          ) {
            return (
              <div className="pagination-dots" key={key}>
                ...
              </div>
            );
          }
          if (
            this.state.currentPage - item === 1 ||
            this.state.currentPage - item === 2 ||
            // (this.state.currentPage - item === 3 && this.state.currentPage === maxPages) ||
            item - this.state.currentPage === 1 ||
            item - this.state.currentPage === 2 ||
            // (item - this.state.currentPage === 3 && this.state.currentPage === 1) ||
            item === '<' ||
            item === '>' ||
            item === 1 ||
            item === 2 ||
            item === maxPages ||
            item === maxPages - 1
          ) {
            return (
              <a href={url} key={key}>
                {item}
              </a>
            );
          }
          return null;
        })}
      </div>
    );
  };

  render() {
    if (this.calculatePages(this.state.totalSearchResults, this.state.perPage) === 0) return null;
    else return this.handlePagination();
  }
}

export default Pagination;
