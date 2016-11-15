import React from 'react';
//import newRecipe from './newRecipe';
//import feedItem from './feedItem';
import {Link} from 'react-router';

export default class Feed extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      contents: []
    };
  }

  //TODO Oscar pls change statusUpdate Entry
  //Done

  render() {
    console.log("feedRendah :p");
  //   return (
  //       <div>
  //           <FeedItem />
  //       </div>
  //   );
  // }
    return (
    <div>
      <div className="col-md-1">
      </div>
      <div
           className="col-md-6"
           id="home">
        <div className="outline">
          <div className="recipe-share">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-10">
                    <b>Someone</b>
                    <br/> Yesterday at 3:48pm
                    <br/>
                    <br/>
                    <Link to="/recipe/:recipeID"> Pumpkin Spice Brownie
                    </Link>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <br/>
                    <Link to="/recipe/:recipeID"><img
                                     src="img/brownie1.png"
                                     width="30%" /></Link>
                    <br/>
                    <br/> These brownies are amazing and so easy to make!
                  </div>
                </div>
                <hr/>
                <div className="row">
                  <div className="col-md-12">
                    <ul className="list-inline">
                      <li>
                        Rating:
                        <span
                              className="glyphicon glyphicon-star"
                              styles="color:red"></span>
                        <span
                              className="glyphicon glyphicon-star"
                              styles="color:red"></span>
                        <span
                              className="glyphicon glyphicon-star"
                              styles="color:red"></span>
                        <span
                              className="glyphicon glyphicon-star"
                              styles="color:red"></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="panel-footer">
                <div className="row">
                  <div className="col-md-12">
                    <a href="#"><span className="glyphicon glyphicon-thumbs-up"></span> </a> · 12 chef points!
                  </div>
                </div>
                <hr/>
                <ul className="media-list">
                  <li className="media">
                    <div className="media-body">
                      <b>Someone Else</b> Wow looks good!
                      <br/> 20 hrs
                    </div>
                  </li>
                  <li className="media">
                    <div className="media-body">
                      <b>Different Someone Else</b> Can&#x0027t wait to try this recipe
                      <br/> 19 hrs
                    </div>
                  </li>
                  <li className="media">
                    <div className="media-body">
                      <div className="input-group">
                        <input
                               type="text"
                               className="form-control"
                               placeholder="Write a comment..." />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="outline">
          <div className="panel panel-default pop">
            <div className="row">
              <div className="col-md-12">
                <h1><center> Most Popular </center></h1>
                <br/>
                <ul className="media-list">
                  <li className="media">
                    <div className="media-left media-top heart">
                      <span className="glyphicon glyphicon-heart-empty"></span>
                    </div>
                    <div className="media-body">
                      <Link to="/recipe/:recipeID">Mac and Cheese</Link>: Three cheese mac and cheese
                      <br/> Avg. Rating:
                      <span
                            className="glyphicon glyphicon-star"
                            styles="color:red"></span>
                      <span
                            className="glyphicon glyphicon-star"
                            styles="color:red"></span>
                      <span
                            className="glyphicon glyphicon-star"
                            styles="color:red"></span>
                      <span
                            className="glyphicon glyphicon-star"
                            styles="color:red"></span>
                      <span
                            className="glyphicon glyphicon-star"
                            styles="color:red"></span>
                    </div>
                  </li>
                  <li className="media">
                    <div className="media-left media-top heart">
                      <span className="glyphicon glyphicon-heart-empty"></span>
                    </div>
                    <div className="media-body">
                      <Link to="/recipe/:recipeID">Brownie</Link>: Pumpkin spice brownie
                      <br/> Avg. Rating:
                      <span
                            className="glyphicon glyphicon-star"
                            styles="color:red"></span>
                      <span
                            className="glyphicon glyphicon-star"
                            styles="color:red"></span>
                      <span
                            className="glyphicon glyphicon-star"
                            styles="color:red"></span>
                      <span
                            className="glyphicon glyphicon-star"
                            styles="color:red"></span>
                      <span
                            className="glyphicon glyphicon-star"
                            styles="color:red"></span>
                    </div>
                  </li>
                  <li className="media">
                    <div className="media-left media-top heart">
                      <span className="glyphicon glyphicon-heart-empty"></span>
                    </div>
                    <div className="media-body">
                      <Link to="/recipePage">Pasta</Link>: Shrimp scampi
                      <br/> Avg. Rating:
                      <span
                            className="glyphicon glyphicon-star"
                            styles="color:red"></span>
                      <span
                            className="glyphicon glyphicon-star"
                            styles="color:red"></span>
                      <span
                            className="glyphicon glyphicon-star"
                            styles="color:red"></span>
                      <span
                            className="glyphicon glyphicon-star"
                            styles="color:red"></span>
                      <span
                            className="glyphicon glyphicon-star"
                            styles="color:red"></span>
                    </div>
                  </li>
                  <li className="media">
                    <div className="media-left media-top">
                      <span className="caret"></span>
                    </div>
                    // Where does ths lead to???
                    <div className="media-body">
                      <a href="#">See More</a>
                    </div>
                    
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <li role="presentation">
          DEBUG
        </li>
        <li
            role="presentation"
            id="fb-db-reset"></li>
      </div>
      <div className="col-md-1">
      </div>
    </div>
    )
  }

}
