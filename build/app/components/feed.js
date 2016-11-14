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
          <div class="col-md-1">
          </div>
          <div class="col-md-6" id="home">

            <div class="outline">
              <div class="recipe-share">
                <div class="panel panel-default">
                  <div class="panel-body">
                    <div class="row">
                      <div class="col-md-10">
                        <b>Someone</b>
                          <br/> Yesterday at 3:48pm
                          <br/> <br/> <a href="#">Pumpkin Spice Brownie</a>
                      </div>

                    </div>
                        <div class="row">
                          <div class="col-md-12">
                            <br/>
                            <a href="#"><img src="img/brownie1.png" width="30%" /></a>
                            <br/> <br/> These brownies are amazing and so easy to make!
                          </div>
                        </div>
                            <hr/>
                        <div class="row">
                          <div class="col-md-12">
                            <ul class="list-inline">
                              <li>
                                Rating:
                                  <span class="glyphicon glyphicon-star" style="color:red"> </span>
                                  <span class="glyphicon glyphicon-star" style="color:red"></span>
                                  <span class="glyphicon glyphicon-star" style="color:red"></span>
                                  <span class="glyphicon glyphicon-star" style="color:red"></span>
                              </li>
                            </ul>
                          </div>
                        </div>
                  </div>
                          <div class="panel-footer">
                            <div class="row">
                              <div class="col-md-12">
                                <a href="#"><span class="glyphicon glyphicon-thumbs-up"></span> Like</a> · 12 people like this
                              </div>
                            </div>
                                <hr/>
                                <ul class="media-list">
                                  <li class="media">
                                    <div class="media-body">
                                      <b>Someone Else</b> Wow looks good!
                                        <br/> <a href="#"><span class="glyphicon glyphicon-thumbs-up"></span> Like</a> · 20 hrs </div>
                                  </li>
                                  <li class="media">
                                    <div class="media-body">
                                      <b>Different Someone Else</b> Can't wait to try this recipe
                                        <br/> <a href="#"><span class="glyphicon glyphicon-thumbs-up"></span> Like</a> · 19 hrs </div>
                                  </li>
                                  <li class="media">
                                    <div class="media-body">
                                      <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Write a comment...">
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                            </div>
                  </div>
                </div>
              </div>
        </div>


            <div class="col-md-4">
              <div class="outline">
                    <div class="panel panel-default pop">
                        <div class="row">
                            <div class="col-md-12">
                                <h1><center>Most Popular</center></h1><br/>
                                <ul class="media-list">
                                    <li class="media">
                                        <div class="media-left media-top heart">
                                            <span class="glyphicon glyphicon-heart-empty"></span>
                                        </div>
                                        <div class="media-body">
                                            <a href="#">Mac and Cheese</a>: Three cheese mac and cheese
                                            <br/>
                                            Avg. Rating:
                                            <span class="glyphicon glyphicon-star" style="color:red"></span>
                                            <span class="glyphicon glyphicon-star" style="color:red"></span>
                                            <span class="glyphicon glyphicon-star" style="color:red"></span>
                                            <span class="glyphicon glyphicon-star" style="color:red"></span>
                                            <span class="glyphicon glyphicon-star" style="color:red"></span>
                                        </div>
                                    </li>
                                    <li class="media">
                                        <div class="media-left media-top heart">
                                            <span class="glyphicon glyphicon-heart-empty"></span> </div>
                                        <div class="media-body">
                                            <a href="#">Brownie</a>: Pumpkin spice brownie
                                            <br/>
                                            Avg. Rating:
                                            <span class="glyphicon glyphicon-star" style="color:red"></span>
                                            <span class="glyphicon glyphicon-star" style="color:red"></span>
                                            <span class="glyphicon glyphicon-star" style="color:red"></span>
                                            <span class="glyphicon glyphicon-star" style="color:red"></span>
                                            <span class="glyphicon glyphicon-star" style="color:red"></span>
                                        </div>
                                    </li>
                                    <li class="media">
                                        <div class="media-left media-top heart">
                                            <span class="glyphicon glyphicon-heart-empty"></span> </div>
                                        <div class="media-body">
                                            <a href="#">Pasta</a>: Shrimp scampi
                                            <br/>
                                            Avg. Rating:
                                            <span class="glyphicon glyphicon-star" style="color:red"></span>
                                            <span class="glyphicon glyphicon-star" style="color:red"></span>
                                            <span class="glyphicon glyphicon-star" style="color:red"></span>
                                            <span class="glyphicon glyphicon-star" style="color:red"></span>
                                            <span class="glyphicon glyphicon-star" style="color:red"></span>
                                        </div>
                                    </li>
                                    <li class="media">
                                        <div class="media-left media-top">
                                            <span class="caret"></span>
                                          </div>
                                        <div class="media-body"> <a href="#">See More</a>
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

            <div class="col-md-1">
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
