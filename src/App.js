import React from 'react';
import './App.css';
import SearchInput from './component/searchinput';
import SearchOutput from './component/searchoutput';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.searchOutputRef = React.createRef();

    this.state = {
      query: '',
    };
  }

  handleSubmit = callback => {
    console.log('Handle Submit in App, query = ' + callback);
    this.setState({ query: callback });
    this.searchOutputRef.current.changeQuery(callback);
  };

  render() {
    return (
      <div className="App">
        <div className="container-fluid bg-white border p-3">
          <SearchInput onSubmit={this.handleSubmit} />
          <SearchOutput ref={this.searchOutputRef} />
        </div>
      </div>
    );
  }
}

export default App;
