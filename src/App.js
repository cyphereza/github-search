import React from 'react';
import './App.css';
import SearchInput from './component/searchinput';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      perPage: 10,
      query: '',
      currentPage: 0,
    };
  }

  handleSubmit = callback => {
    this.setState({ query: callback });
  };

  showQuery = () => {
    if (this.state.query !== '') return <div>{this.state.query}</div>;
    return null;
  };

  render() {
    return (
      <div className="App">
        <div className="container-fluid bg-white border p-3">
          <SearchInput onSubmit={this.handleSubmit} />
          {this.showQuery()}
        </div>
      </div>
    );
  }
}

export default App;
