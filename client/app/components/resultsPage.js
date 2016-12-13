import React from 'react';
import ResultsItem from './resultsItem';
import {searchForRecipes} from '../server';

export default class ResultsPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      invalidSearch: false,
      results: []
    };
  }

  refresh() {
    var searchTerm = this.props.searchTerm;
    if (searchTerm !== "") {
      searchForRecipes(searchTerm, (result) => {
        this.setState({
          loaded: true,
          results: result
        });
      });
    } else {
      this.setState({
        invalidSearch: true
      });
    }
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
  	this.state;
    return (
      <div>
        {
          this.state.results.map((result) => {
            return (
              <ResultsItem key={result} data={result} />
            )
          })
        }
      </div>
    );
  }
}
