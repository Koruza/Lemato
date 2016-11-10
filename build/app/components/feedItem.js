import React from 'react';
import StatusUpdate from './statusupdate';
import CommentThread from './commentthread';
import Comment from './comment';
import {postComment} from '../server';
import {likeFeedItem} from '../server';
import {unlikeFeedItem} from '../server';

//TODO: Implement share in Server and here
//import {share} from '../server';

export default class FeedItem extends React.Component {
  constructor(props) {
  super(props);
  this.state = props.data;
  }
  handleCommentPost(commentText) {
  postComment(this.state._id, 1, commentText, (updatedFeedItem) => {
  this.setState(updatedFeedItem);
  });
  }

handleLikeClick(clickEvent) {
clickEvent.preventDefault();
if (clickEvent.button === 0) {
var callbackFunction = (updatedLikeCounter) => {
this.setState({likeCounter: updatedLikeCounter});
};
if (this.didUserLike()) {
unlikeFeedItem(this.state._id, 1, callbackFunction);
} else {
likeFeedItem(this.state._id, 1, callbackFunction);
}
}
}

//TODO: Change to Share
handleShareClick(clickEvent) {
clickEvent.preventDefault();
if (clickEvent.button === 0) {
var callbackFunction = (updatedLikeCounter) => {
this.setState({likeCounter: updatedLikeCounter});
};
if (this.didUserLike()) {
unlikeFeedItem(this.state._id, 1, callbackFunction);
} else {
likeFeedItem(this.state._id, 1, callbackFunction);
}
}
}

didUserLike() {
var likeCounter = this.state.likeCounter;
var liked = false;
for (var i = 0; i < likeCounter.length; i++) {
if (likeCounter[i]._id === 1) {
liked = true;
break;
}
}
return liked;

}

//TODO: Change up what it looks like here
render() {
  var likeButtonText = "Like";
if (this.didUserLike()) {
likeButtonText = "Unlike";
}

var data = this.state;
       var contents;
       switch (data.type) {
           case "statusUpdate":
               contents = (
                   <StatusUpdate key={data._id} author={data.contents.author} postDate={data.contents.postDate} location={data.contents.location}>
                     {data.contents.contents.split("\n").map((line, i) => {
                       return (
                       <p key={"line" + i}>{line}</p>
                       );
                       })}
                   </StatusUpdate>
               );
               break;
           default:
               throw new Error("Unknown FeedItem: " + data.type);
       }
       return (
           <div className="new-recipe panel panel-default">
               <div className="panel-body">
                   {contents}
                   <hr/>
                   <div className="row">
                       <div className="col-md-12">
                           <ul className="list-inline">
                               <li>
                                 <a href="#" onClick={(e) => this.handleLikeClick(e)}>
                                 <span className="glyphicon glyphicon-cutlery"></span>
                                 {likeButtonText}
                                 </a>
                               </li>
                               <li>
                                   <a href="#">
                                       <span className="glyphicon glyphicon-comment"></span>&nbsp;
                                        Comment
                                   </a>
                               </li>
                               <li>
                                //Handle click of share
                                   <a href="#" onClick={(e) => this.handleShareClick(e)}>
                                       <span className="glyphicon glyphicon-share-alt"></span>&nbsp;
                                        Share</a>
                               </li>
                           </ul>
                       </div>
                   </div>
               </div>
               <div className="panel-footer">
                   <div className="row">
                       <div className="col-md-12">
                           <a href="#">{data.likeCounter.length}
                               chef points </a>
                           like this
                       </div>
                   </div>
                   <hr/>
                   <CommentThread onPost={(commentText) => this.handleCommentPost(commentText)}>
                     {
                       data.comments.map((comment, i) => {
                       // i is comment's index in comments array
                       return (
                         <Comment key={i}
                         commentIdx={i}
                         data={comment}
                         feedItemID={data._id}
                         author={comment.author}
                         postDate={comment.postDate}>
                         {comment.contents}
                         </Comment>
                       );
                     })
}
                   </CommentThread>
               </div>
           </div>
       )
   }

}
