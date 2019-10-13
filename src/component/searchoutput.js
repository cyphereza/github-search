import React from 'react';
import octocat from '../assets/images/octocat.png';
import loading from '../assets/images/loading.gif';
import Preview from './preview';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  makeSelectResultsData,
  makeSelectResultsTotalCount,
  makeSelectResultsIsSearching,
  makeSelectResultsQuery,
} from '../redux/selectors/results';

class SearchOutput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mouseHover: false,
      showRodal: [false, false, false, false, false, false, false, false, false, false],
    };
  }

  parseDate = unparsedDate => {
    let returnedDate = new Date(Date.parse(unparsedDate));
    return returnedDate.toDateString();
  };

  showLanguage = language => {
    if (language)
      return (
        <div className="small d-inline-block greyColor" style={{ width: 100 }}>
          <i className="fa fa-circle greyColor pr-1" />
          {language}
        </div>
      );
    return <div className="small d-inline-block greyColor" style={{ width: 100 }} />;
  };

  getTotalSearchResults = () => {
    return this.state.totalSearchResults;
  };

  trimString = (description, maxLength) => {
    if (description.length > maxLength) {
      description = description.slice(0, maxLength - 3);
      let lastIndexSpace = description.lastIndexOf(' ');
      description = description.slice(0, lastIndexSpace);
      description += '...';
    }
    return description;
  };

  handleOnClick = (repoLink, key) => {
    this.setState(prev => ({
      showRodal: prev.showRodal.map((val, i) => (i === key ? true : false)),
    }));
    // window.open(repoLink);
  };

  handleVisible = event => {
    this.setState(prev => ({
      showRodal: prev.showRodal.map((val, i) => false),
    }));
  };

  render() {
    if (this.props.isSearching === true && this.props.query !== '') {
      return (
        <div className="container-fluid p-0 text-center">
          <h2 className="font-weight-bold fluid-text">Searching...</h2>
          <br />
          <img src={loading} alt="Loading... please wait" className="img-fluid octocat" />
        </div>
      );
    }
    if (
      (this.props.responseData === null || this.props.responseData.length === 0) &&
      this.props.totalResultsCount === 0 &&
      this.props.isSearching === false &&
      this.props.query !== ''
    ) {
      return (
        <div className="container-fluid p-0 text-center">
          <h2 className="font-weight-bold fluid-text">The results you're looking for is not here...</h2>
          <br />
          <img src={octocat} alt="Octocat, no results!" className="img-fluid octocat" />
        </div>
      );
    }
    if (this.props.responseData !== null && this.props.isSearching === false) {
      let keyLength = this.props.responseData.length;
      return (
        <div className="container-fluid text-left p-0">
          <h5 className="font-weight-bold border-bottom pt-3 pb-3">
            {this.props.totalResultsCount} repository results
          </h5>
          {this.props.responseData.map((resultObj, key) => {
            return (
              <div key={key}>
                <div
                  className="hover-mouse"
                  onClick={e => {
                    this.handleOnClick(resultObj.html_url, key);
                  }}
                >
                  <div className="hover-mouse hover-mouse--on p-2">
                    <div className="row">
                      <div className="col text-primary font-weight-bold d-inline-block mb-2">
                        {this.trimString(resultObj.full_name, 70)}
                      </div>
                      <div className="d-inline-block" style={{ width: 200 }}>
                        {this.showLanguage(resultObj.language)}
                        <div className="small d-inline-block greyColor" style={{ width: 100 }}>
                          <i className="fa fa-star greyColor pr-1" />
                          {resultObj.stargazers_count > 0 ? resultObj.stargazers_count : 0}
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">{resultObj.description && this.trimString(resultObj.description, 500)}</div>
                    <div className="text-muted small">Updated on {this.parseDate(resultObj.updated_at)}</div>
                  </div>
                  {key < 9 && key !== keyLength - 1 && <hr />}
                </div>
                <Preview data={resultObj} show={this.state.showRodal[key]} onHide={this.handleVisible} />
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = createStructuredSelector({
  responseData: makeSelectResultsData(),
  totalResultsCount: makeSelectResultsTotalCount(),
  isSearching: makeSelectResultsIsSearching(),
  query: makeSelectResultsQuery(),
});

export default connect(mapStateToProps)(SearchOutput);
