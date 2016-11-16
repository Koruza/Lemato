import React from 'react';
//import newRecipe from './newRecipe';
import FeedItem from './feeditem';
// import {Link} from 'react-router';
import {getFeedData}from '../server';
import {postNewRecipe} from "../server";

export default class Feed extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      contents: []
    };
  }

  onPost(postContents) {
    if(postContents.type === 1) {
      postNewRecipe(1,postContents,1,() => {
        this.refresh();
      });
    }else{
      postNewRecipe(1,postContents,2,() => {
        this.refresh();
      });
    }
  }

  refresh() {
   getFeedData(this.props.user, (feedData) => {
     // console.log(feedData);
     this.setState(feedData);
   });
  }

  componentDidMount() {
   this.refresh()
  }

  render() {
    return (
      <div>
       {this.state.contents.map((feedItem) => {
          return (
            <FeedItem 
                      key={feedItem._id}
                      data={feedItem} />
          )
      })}
      </div>
    )
  }

}
