import React from 'react';
import StatusUpdate from './Statusupdate';
import CommentThread from './Commentthread';
import Comment from './Comment';
import {postComment} from '../server';
import {likeFeedItem} from '../server';
import {unlikeFeedItem} from '../server';
// import {handleShareClick} from '../server';

export default class FeedItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          contents: []
        };
    }

    componentDidMount() {
    this.refresh();
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
      var popup = document.getElementById('myPopup');
      popup.classList.toggle('show');
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
          <div>
            <div className="new-recipe panel panel-default">
                <div className="panel-body">
                    {contents}
                    <hr/>
                    <div className="row">
                        <div className="col-md-12">
                            <ul className="list-inline pagination">
                                <li>
                                    <a href="#" onClick={(e) => this.handleLikeClick(e)}>
                                        <span className="glyphicon glyphicon-cutlery"></span>
                                        {likeButtonText}
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span className="glyphicon glyphicon-comment"></span>&nbsp; Comment
                                    </a>
                                </li>
                                <li>
                                    //button
                                    <a href="#" onClick="document.getElementById('id01').style.display='block'" style="width:auto;">
                                        <span className="glyphicon glyphicon-share-alt"></span>&nbsp; Share
                                    </a>
                                    //Box form
                                    <div id="id01" className="modal">
                                      <form className="modal-content animate" action="action_page.php">
                                        <div className="imgcontainer">
                                          <span onClick="document.getElementById('id01').style.display='none'" className="close" title="Close Modal">&times;</span>
                                          <img src="img_avatar2.png" alt="Avatar" className="avatar"/>
                                        </div>

                                        <div className="container">
                                          <label><b>Username</b></label>
                                          <input type="text" placeholder="Enter Username" name="uname" required/>

                                          <label><b>Password</b></label>
                                          <input type="password" placeholder="Enter Password" name="psw" required/>

                                          <button type="submit">Login</button>
                                          <input type="checkbox" checked="checked"/> Remember me
                                        </div>

                                        <div className="container" style="background-color:#f1f1f1">
                                          <button type="button" onClick="document.getElementById('id01').style.display='none'" className="cancelbtn">Cancel</button>
                                          <span className="psw">Forgot <a href="#">password?</a></span>
                                        </div>
                                      </form>
                                    </div>

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="panel-footer">
                    <div className="row">
                        <div className="col-md-12">
                            <a href="#">{data.likeCounter.length}
                                chef points
                            </a>
                            like this
                        </div>
                    </div>
                    <hr/>
                    <CommentThread onPost={(commentText) => this.handleCommentPost(commentText)}>
                        {data.comments.map((comment, i) => {
                            // i is comment's index in comments array
                            return (
                                <Comment key={i} commentIdx={i} data={comment} feedItemID={data._id} author={comment.author} postDate={comment.postDate}>
                                    {comment.contents}
                                </Comment>
                            );
                        })
                    } < /CommentThread>
               </div >
             </div>
           </div>

        )
    }

}
