import React from 'react';
import { httpService } from '../services';
import { API } from '../constant';

class SearchOutput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      perPage: 10,
      currentPage: 1,
      totalSearchResults: 0,
      responseData: null,
      isLoaded: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Prev: ', prevState);
    console.log('Current: ', this.state);
    if (prevState.searchQuery !== this.state.searchQuery && prevState.currentPage !== this.state.currentPage) {
      console.log('Proceed to searching repos...');
      this.searchRepositories();
    }
  }

  setSearchQuery = async (searchQuery, currentPage) => {
    await this.setState({ searchQuery, currentPage });
    await this.searchRepositories();
  };

  searchRepositories = async () => {
    console.log('Searching repo with query ' + this.state.searchQuery);

    if (this.state.searchQuery !== '' || this.state.searchQuery !== null) {
      this.setState({ isLoaded: false });
      var url =
        API.endpoints.searchRepositories +
        '?q=' +
        this.state.searchQuery +
        '&per_page=' +
        this.state.perPage +
        '&page=' +
        this.state.currentPage;
      let response = await httpService.get(url);
      await this.setState({
        responseData: response.data,
        isLoaded: true,
        totalSearchResults: response.data.total_count,
      });
    }
  };

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

  render() {
    if (this.state.responseData !== null) {
      return (
        <div className="container-fluid text-left p-0">
          <h5 className="font-weight-bold border-bottom pt-3 pb-3">
            {this.state.totalSearchResults} repository results
          </h5>
          {this.state.responseData.items.map((resultObj, key) => {
            return (
              <div key={key}>
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
                <div className="mb-4">{this.trimString(resultObj.description, 500)}</div>
                <div className="text-muted small">Updated on {this.parseDate(resultObj.updated_at)}</div>
                {key < 9 && <hr />}
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  }
}

export default SearchOutput;
