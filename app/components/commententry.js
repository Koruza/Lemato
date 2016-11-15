import React from 'react';

export default class CommentEntry extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ""
		};
	}

	handleChange(e) {
		this.setState({ value: e.target.value });
	}

	handleKeyUp(e) {
		if (e.key === "Enter") {
			var comment = this.state.value.trim();
			if (comment !== "") {
				// Post comment
				this.props.onPost(this.state.value);
				this.setState({ value: "" });
			}
		}
	}

	render() {
		return (
			<div>
				<div className="media-left media-top">
					PIC
				</div>
				<div className="media-body">
					<div className="input-group">
						<input type="text"
								className="form-control"
								placeholder="Write a comment..."
								value={this.state.value}
								onChange={(e) => this.handleChange(e)}
								onKeyUp={(e) => this.handleKeyUp(e)} />
						<span className="input-group-btn">
							<button className="btn btn-default" type="button">
								<span className="glyphicon glyphicon-camera"></span>
							</button>
							<button className="btn btn-default" type="button">
								<span className="glyphicon glyphicon-heart"></span>
							</button>
						</span>
					</div>
				</div>
			</div>
		)
	}
}
