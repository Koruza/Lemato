import React from 'react';
import FeedItem from './feeditem';
import newRecipe from './newRecipe';
import {getFeedData} from '../server';
import {postStatusUpdate} from '../server';

export default class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contents: []
        };
    }

    //TODO Oscar pls change statusUpdate Entry
    //Done

    render() {
        // return (
        //     <div>
        //         <newRecipe onPost={(postContents) => this.onPost(postContents)}/> {this.state.contents.map((feedItem) => {
        //             return (<FeedItem key={feedItem._id} data={feedItem}/>)
        //         })}
        //     </div>
        // )
        return (
        <div>
          <div className="col-md-1">
          </div>
          <div className="col-md-6" id="home">

            <div className="outline">
              <div className="recipe-share">
                <div className="panel panel-default">
                  <div className="panel-body">
                    <div className="row">
                      <div className="col-md-10">
                        <b>Someone</b>
                          <br/> Yesterday at 3:48pm
                          <br/> <br/> <a href="#">Pumpkin Spice Brownie</a>
                      </div>

                    </div>
                        <div className="row">
                          <div className="col-md-12">
                            <br/>
                            <a href="#"><img src="img/brownie1.png" width="30%" /></a>
                            <br/> <br/> These brownies are amazing and so easy to make!
                          </div>
                        </div>
                            <hr/>
                        <div className="row">
                          <div className="col-md-12">
                            <ul className="list-inline">
                              <li>
                                Rating:
                                  <span className="glyphicon glyphicon-star" style="color:red"> </span>
                                  <span className="glyphicon glyphicon-star" style="color:red"></span>
                                  <span className="glyphicon glyphicon-star" style="color:red"></span>
                                  <span className="glyphicon glyphicon-star" style="color:red"></span>
                              </li>
                            </ul>
                          </div>
                        </div>
                  </div>
                          <div className="panel-footer">
                            <div className="row">
                              <div className="col-md-12">
                                <a href="#"><span className="glyphicon glyphicon-thumbs-up"></span> Like</a> · 12 people like this
                              </div>
                            </div>
                                <hr/>
                                <ul className="media-list">
                                  <li className="media">
                                    <div className="media-body">
                                      <b>Someone Else</b> Wow looks good!
                                        <br/> <a href="#"><span className="glyphicon glyphicon-thumbs-up"></span> Like</a> · 20 hrs </div>
                                  </li>
                                  <li className="media">
                                    <div className="media-body">
                                      <b>Different Someone Else</b> Can't wait to try this recipe
                                        <br/> <a href="#"><span className="glyphicon glyphicon-thumbs-up"></span> Like</a> · 19 hrs </div>
                                  </li>
                                  <li className="media">
                                    <div className="media-body">
                                      <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Write a comment..."/>
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
                                <h1><center>Most Popular</center></h1><br/>
                                <ul className="media-list">
                                    <li className="media">
                                        <div className="media-left media-top heart">
                                            <span className="glyphicon glyphicon-heart-empty"></span>
                                        </div>
                                        <div className="media-body">
                                            <a href="#">Mac and Cheese</a>: Three cheese mac and cheese
                                            <br/>
                                            Avg. Rating:
                                            <span className="glyphicon glyphicon-star" style="color:red"></span>
                                            <span className="glyphicon glyphicon-star" style="color:red"></span>
                                            <span className="glyphicon glyphicon-star" style="color:red"></span>
                                            <span className="glyphicon glyphicon-star" style="color:red"></span>
                                            <span className="glyphicon glyphicon-star" style="color:red"></span>
                                        </div>
                                    </li>
                                    <li className="media">
                                        <div className="media-left media-top heart">
                                            <span className="glyphicon glyphicon-heart-empty"></span> </div>
                                        <div className="media-body">
                                            <a href="#">Brownie</a>: Pumpkin spice brownie
                                            <br/>
                                            Avg. Rating:
                                            <span className="glyphicon glyphicon-star" style="color:red"></span>
                                            <span className="glyphicon glyphicon-star" style="color:red"></span>
                                            <span className="glyphicon glyphicon-star" style="color:red"></span>
                                            <span className="glyphicon glyphicon-star" style="color:red"></span>
                                            <span className="glyphicon glyphicon-star" style="color:red"></span>
                                        </div>
                                    </li>
                                    <li className="media">
                                        <div className="media-left media-top heart">
                                            <span className="glyphicon glyphicon-heart-empty"></span> </div>
                                        <div className="media-body">
                                            <a href="#">Pasta</a>: Shrimp scampi
                                            <br/>
                                            Avg. Rating:
                                            <span className="glyphicon glyphicon-star" style="color:red"></span>
                                            <span className="glyphicon glyphicon-star" style="color:red"></span>
                                            <span className="glyphicon glyphicon-star" style="color:red"></span>
                                            <span className="glyphicon glyphicon-star" style="color:red"></span>
                                            <span className="glyphicon glyphicon-star" style="color:red"></span>
                                        </div>
                                    </li>
                                    <li className="media">
                                        <div className="media-left media-top">
                                            <span className="caret"></span>
                                          </div>
                                        <div className="media-body"> <a href="#">See More</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
              </div>
              <li role="presentation">DEBUG</li>
              <li role="presentation" id="fb-db-reset"></li>
            </div>
            <div className="col-md-1">
          </div>
        </div>
        )
    }

    refresh() {
        getFeedData(this.props.user, (feedData) => {
            this.setState(feedData);
        });
    }

    onPost(postContents) {
        postStatusUpdate(1, "Amherst, MA", postContents, () => {
            this.refresh();
        });
    }

    componentDidMount() {
        this.refresh();
    }

}
