import React from 'react';
import ResultsItem from './resultsItem';
import {Link} from 'react-router';
import {likeRecipe, dislikeRecipe, getRecipePageSync} from '../server';
import {readDocument} from '../database';

export default class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = props
  }

  render() {
    var recipeIDs = this.state
    var a = [1, 2]
    return (
      <div>
        {a.map((recipeID) => {
          return (<ResultsItem key={recipeID} data={recipeID} />)
        })}
      </div>
    )
  }
}
