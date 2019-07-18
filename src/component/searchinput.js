import React from 'react';
import PropTypes from 'prop-types';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = { searchQuery: '' };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchQuery);
  };

  handleChange = event => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control border-right-0"
            placeholder="Search..."
            aria-label="Search..."
            aria-describedby="basic-addon"
            defaultValue={this.state.searchQuery}
            onChange={this.handleChange}
          />
          <div className="input-group-append" onClick={this.handleSubmit}>
            <span className="input-group-text bg-white border-left-0" id="basic-addon">
              <i className="fa fa-search prefix iconColor" />
            </span>
          </div>
        </div>
      </form>
    );
  }
}

SearchInput.propTypes = {
  onSubmit: PropTypes.any,
};

export default SearchInput;
