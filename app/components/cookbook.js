import React from 'react';
import { Link } from 'react-router';
import {getCookbookData} from '../server';

export default class Cookbook extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.data;
    this.state = {
      contents: []
    };
    console.log(this.props.user);
  }

  refresh() {
    getCookbookData(this.props.user, (cookbook) => {
      this.setState(cookbook);
    });
  }

  render() {
    this.refresh();
    console.log(cookbook._id);
    return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <div className="panel lemato-left-nav">
              <div className="">
                <h4>Profile</h4>
              </div>
              <hr />
              <ul className="nav nav-pills nav-stacked">
                <li role="presentation">
                  <Link to="cookbook"><span className="glyphicon glyphicon-book"></span> Cookbook</Link>
                </li>
                <li role="presentation">
                  <Link to="settings"><span className="glyphicon glyphicon-cog"></span> Account Settings</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-7 no-margin">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="panel">
                  <div className="panel-body cookbook-header">
                    <span className="glyphicon glyphicon-cutlery tilt-left"></span>
                    <h1>My Cookbook</h1>
                    <span className="glyphicon glyphicon-cutlery tilt-right"></span>
                  </div>
                  <div className="panel-footer">
                    <div className="media">
                      <div className="media-left">
                        <Link to="/recipe/:recipeID"><img
                                         className="media-object result-pic"
                                         src="img/brownie-egg.jpg"
                                         alt="brownie-egg" /></Link>
                      </div>
                      <div className="media-body">
                        <h4 className="media-heading"><Link to="/recipePage"> Egg Brownie </Link></h4> A brownie but in the shape of an egg. Trick your friends with this delicious treat. Only 200 calories!
                      </div>
                      <div className="media-right recipe-vote">
                        <a href="#"><span className="glyphicon glyphicon-arrow-up"></span></a>
                        <div>
                          5129
                        </div>
                        <a href="#"><span className="glyphicon glyphicon-arrow-down"></span></a>
                      </div>
                    </div>
                    <hr />
                    <div className="media">
                      <div className="media-left">
                        <Link to="/recipe/:recipeID"><img
                                         className="media-object result-pic"
                                         src="img/brownie1.png"
                                         alt="brownie" /></Link>
                      </div>
                      <div className="media-body">
                        <h4 className="media-heading">Double Fudge Brownie</h4> A delicious double fudge brownie. Even a monkey could bake these!
                      </div>
                      <div className="media-right recipe-vote">
                        <a href="#"><span className="glyphicon glyphicon-arrow-up"></span></a>
                        <div>
                          4459
                        </div>
                        <a href="#"><span className="glyphicon glyphicon-arrow-down"></span></a>
                      </div>
                    </div>
                    <hr />
                    <div className="media">
                      <div className="media-left">
                        <Link to="/recipe/:recipeID"><img
                                         className="media-object result-pic"
                                         src="img/brownie-sundae.jpg"
                                         alt="brownie-sundae" /></Link>
                      </div>
                      <div className="media-body">
                        <h4 className="media-heading">Brownie Sundae</h4> What's more delicous than a brownie? A brownie with ice cream!
                      </div>
                      <div className="media-right recipe-vote">
                        <a href="#"><span className="glyphicon glyphicon-arrow-up"></span></a>
                        <div>
                          3479
                        </div>
                        <a href="#"><span className="glyphicon glyphicon-arrow-down"></span></a>
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
