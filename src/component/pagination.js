import React from 'react';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectResultsCurrentPage,
  makeSelectResultsTotalCount,
  makeSelectResultsPerPage,
  makeSelectResultsIsSearching,
} from '../redux/selectors/results';
import { connect } from 'react-redux';
import * as changePageAction from '../redux/ducks/search';

class Pagination extends React.Component {
  changeCurrentPage = currentPage => {
    this.props.changeCurrentPage(currentPage);
  };

  calculatePages = (totalSearchResults, perPage) => {
    if (totalSearchResults === 0 || perPage === 0) return 0;
    return Math.ceil(totalSearchResults / perPage);
  };

  handlePagination = () => {
    let maxPages = this.calculatePages(this.props.totalCount, this.props.perPage);
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
            if (calculatedKey === this.props.currentPage)
              return (
                <a href={url + '&page=' + calculatedKey + '#'} key={key} className="inactive">
                  {item}
                </a>
              );
            url += '&page=' + calculatedKey;
          } else if (item === '>') {
            let calculatedKey = currentPage + 1;
            if (calculatedKey > maxPages) calculatedKey = maxPages;
            if (calculatedKey === this.props.currentPage)
              return (
                <a href={url + '&page=' + calculatedKey + '#'} key={key} className="inactive">
                  {item}
                </a>
              );
            url += '&page=' + calculatedKey;
          } else {
            url += '&page=' + item;
          }

          if (this.props.currentPage === item) {
            return (
              <a href={url + '#'} key={key} className="active">
                {item}
              </a>
            );
          }
          if (
            (this.props.currentPage - item === 3 &&
              item !== 1 &&
              item !== 2 &&
              this.props.currentPage !== 1 &&
              this.props.currentPage !== 2) ||
            (item - this.props.currentPage === 3 &&
              item !== maxPages &&
              item !== maxPages - 1 &&
              this.props.currentPage !== maxPages &&
              this.props.currentPage !== maxPages - 1)
          ) {
            return (
              <div className="pagination-dots" key={key}>
                ...
              </div>
            );
          }
          if (
            this.props.currentPage - item === 1 ||
            this.props.currentPage - item === 2 ||
            item - this.props.currentPage === 1 ||
            item - this.props.currentPage === 2 ||
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
    if (this.calculatePages(this.props.totalCount, this.props.perPage) === 0 || this.props.isSearching) return null;
    else return this.handlePagination();
  }
}

const mapStateToProps = createStructuredSelector({
  currentPage: makeSelectResultsCurrentPage(),
  totalCount: makeSelectResultsTotalCount(),
  perPage: makeSelectResultsPerPage(),
  isSearching: makeSelectResultsIsSearching(),
});

const mapDispatchToProps = {
  changePage: changePageAction.changePage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagination);
