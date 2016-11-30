import React from 'react';
import {Link} from 'react-router';
import {likeRecipe, dislikeRecipe, getRecipePageSync} from '../server';
import {readDocument} from '../database';

export default class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = getRecipePageSync(props.recipe)
  }

  didUserLike() {
    var chefPoints = this.state.chefPoints;
    var liked = false;
    for (var i = 0; i < chefPoints.length; i++) {
      if (chefPoints[i]._id === 1) {
        liked = true;
        break;
      }
    }
    return liked;
  }

  handleSearchClick(clickEvent){
    clickEvent.preventDefault();
    console.log(clickEvent)
  }

  handleLikeClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      if(!this.didUserLike()) {
        var callbackFunction = (updatedChefPointsCounter) => {
            this.setState({chefPoints: updatedChefPointsCounter});
        };
        likeRecipe(this.state._id, 1, callbackFunction);
      }
    }
  }

  handleDislikeClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      if(this.didUserLike()) {
        var callbackFunction = (updatedChefPointsCounter) => {
            this.setState({chefPoints: updatedChefPointsCounter});
        };
        dislikeRecipe(this.state._id, 1, callbackFunction);
      }
    }
  }

  render() {
    var data = this.state

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="panel panel-success">
                <div className="panel-body">
                  <div className="media">
                    <div className="media-left">
                      <Link to={"/recipes/" + data._id}>
                        <img className="media-object result-pic" src={data.pic} alt="brownie-egg"></img>
                      </Link>
                    </div>
                    <div className="media-body">
                      <h4 className="media-heading">
                        <Link onClick={(e) => this.handleSearchClick(e)} to={"/recipePage/" + data._id}>{data.name}</Link>
                      </h4>
                      {data.description}
                    </div>
                    <div className="media-right recipe-vote">
                      <a href="#" onClick={(e) => this.handleLikeClick(e)}>
                        <span className="glyphicon glyphicon-arrow-up"></span>
                      </a>
                      <div>{data.chefPoints.length}</div>
                      <a href="#" onClick={(e) => this.handleDislikeClick(e)}>
                        <span className="glyphicon glyphicon-arrow-down"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </div>
    )
  }
}
