import React from 'react';
import {unixTimeToString} from '../util.js';
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
                    <Link to={"/cookbook/" + this.props.author._id}>
                        {this.props.author.fullName}
                    </Link>{this.props.children}
                    <br />
                    {unixTimeToString(this.props.postDate)}
                </div>
            </div>
        )
    }
}
