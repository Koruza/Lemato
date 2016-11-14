import React from 'react';
import {unixTimeToString} from '../util.js';
import {Link} from 'react-router';


//PLACEHOLDER FOR NEW RECIPE PAGE

export default class StatusUpdate extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-10">
            <div className="media">
              <div className="media-left media-top">
              PIC
              </div>
              <div className="media-body">
                <Link to={"/profile/" + this.props.author._id}>
                {this.props.author.fullName}
                </Link>
              <br /> {unixTimeToString(this.props.postDate)} · {this.props.location} · <span
              className="glyphicon glyphicon-user"></span>
              </div>
            </div>
          </div>
          <div className="col-md-2">
          <span className="caret pull-right"></span>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
          {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
