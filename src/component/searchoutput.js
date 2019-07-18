import React from 'react';

class SearchOutput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      perPage: 10,
      currentPage: 1,
      responseData: null,
      isLoaded: false,
    };
  }

  changeQuery = callback => {
    console.log('change query');
    this.setState({ query: callback });
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps);
    // console.log(prevState);
    if (prevState.query !== this.state.query) {
      this.searchRepositories();
    }
  }

  searchRepositories = async () => {
    console.log('Searching repo...');

    if (this.state.query !== '' || this.state.query !== null) {
      this.setState({ isLoaded: false });
      let response = await fetch(
        'https://api.github.com/search/repositories?per_page=' +
          this.state.perPage +
          '&q=' +
          this.state.query +
          '&page=' +
          this.state.currentPage
      );
      let list = await response.json();
      this.setState({ responseData: list, isLoaded: true });
      console.log(list);
    }
  };

  render() {
    if (this.state.responseData !== null) {
      return (
        <div className="container-fluid text-left p-0">
          <h5 className="font-weight-bold border-bottom pt-3 pb-3">
            {this.state.responseData.total_count} repository results
          </h5>
          {this.state.responseData.items.map(resultObj => {
            return <div>{resultObj.full_name}</div>;
          })}
        </div>
      );
    }
    return null;
  }
}

export default SearchOutput;
