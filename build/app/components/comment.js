import React from 'react';
import {Link} from 'react-router';

export default class Comment extends React.Component {

  constructor(props) {
  super(props);
  this.state = props.data;
}

render() {
    return (
    <div>
    <div className="media-left media-top">
    PIC
    </div>
    <div className="media-body">
      <Link to={"/profile/" + this.props.author._id}>
      {this.props.author.fullName}
      </Link>{this.props.children}
    </div>
    </div>
    )
  }
}
