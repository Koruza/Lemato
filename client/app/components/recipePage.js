import React from 'react';
import { Link } from 'react-router';
import {readDocument} from '../database';
import {getRecipePageData, postNewRecipe, getRecipePageSync} from '../server';
// import {getRecipePageSync} from '../server';

export default class RecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-md-offset-2">
              <div className="panel panel-default lemato-main-feed">
                <div className="panel-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="media">
                        <h1 className="text-center">{this.state.name}</h1>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <hr />
                      <div
                        className="btn-group"
                        role="group">
                        <button
                          className="btn btn-default"
                          type="button">
                          <span className="glyphicon glyphicon-plus-sign"></span> Save
                          </button>
                          <button
                            className="btn btn-default"
                            type="button">
                            <span className="glyphicon glyphicon-share-alt"></span> Share
                            </button>
                          </div>
                          <hr className="small-bot-padding" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <img
                            src={this.state.pic}
                            className="center-block"
                            alt="" />
                        </div>
                      </div>
                    </div>
                    <hr className="small-bot-padding" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <img
                         src={this.state.pic}
                         className="center-block"
                         alt="" />
                  </div>
                </div>
              </div>
              <div className="panel-footer">
                <div className="row">
                  <div className="col-md-12 side-padding">
                    <h2>Ingredients</h2>
                    <ul>
                      {this.state.ingredients.map(function(item){
                        return <li>{item}</li>;
                      })}
                    </ul>
                  </div>
                </div>
                <hr />
                <div className="row no-padding">
                  <div className="col-md-12 side-padding">
                    <h2>Instructions</h2>
                    <ul>
                      {this.state.instructions.map(function(item){
                        return <li>{item}</li>;
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="panel panel-default lemato-right-sidebar">
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-12">
                        <h4>Related Recipes:</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="panel panel-default lemato-right-sidebar">
                    <div className="panel-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-md-12">
                              <h4>Related Recipes:</h4>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <ul className="media-list">
                                <li className="media">
                                  <img
                                    src="img/brownie1.png"
                                    className=""
                                    alt="" />
                                  <div className="media-body">
                                    <Link to="/recipePage/:id">Double Fudge Brownie</Link>: A delicious double fudge brownie. Even a monkey could bake these!
                                    </div>
                                  </li>
                                  <li className="media">
                                    <img
                                      src="img/brownie-sundae.jpg"
                                      className=""
                                      alt="" />
                                    <div className="media-body">
                                      <Link to="/recipePage/:id">Brownie Sundae</Link>: What's more delicous than a brownie? A brownie with ice cream!
                                      </div>
                                    </li>
                                    <li className="media">
                                      <div className="media-left media-top">
                                        <span className="caret"></span>
                                      </div>
                                      <div className="media-body">
                                        //See more link here
                                        <a href="#">See More</a>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        }
