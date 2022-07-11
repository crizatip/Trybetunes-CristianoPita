import React from 'react';
import Header from './Header';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSearch: '',
      buttonDisabled: true,
    };
  }

  buttonDisabledHandle = () => {
    const { currentSearch } = this.state;
    if (currentSearch.length >= '2') {
      this.setState({ buttonDisabled: false });
    }
  }

  handleChange = (event) => {
    this.setState(
      { currentSearch: event.target.value },
      () => {
        this.buttonDisabledHandle();
      },
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    const { currentSearch, buttonDisabled } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <form id="formSearch" onSubmit={ this.handleSubmit }>
            <input
              type="text"
              data-testid="search-artist-input"
              name="search"
              id="search"
              onChange={ this.handleChange }
              value={ currentSearch }
            />
            <button
              type="submit"
              form="formSearch"
              data-testid="search-artist-button"
              disabled={ buttonDisabled }
            >
              Entrar
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Search;
