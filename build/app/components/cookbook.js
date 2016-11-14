import React from 'react';
import {Link} from 'react-router';

export default class cookbook extends React.Component {
	render() {
		return (
			<div>
			<div className="container">
			<div className="navbar-header">
				<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
					<span className="sr-only">Toggle navigation</span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
				</button>
				<a className="navbar-brand" href="#">
					<span><img src="img/lemato.png"/> Lemato</span>
				</a>
			</div>
			<div className="collapse navbar-collapse " id="bs-example-navbar-collapse-1">
				<form className="navbar-form navbar-left" role="search">
					<div className="input-group">
						<input type="text" className="form-control lemato-search" placeholder="Search Lemato"/>
						<span className="input-group-btn">
							<button type="submit" className="btn btn-default">
								<span className="glyphicon glyphicon-search"></span>
							</button>
						</span>
					</div>
				</form>
				<ul className="nav navbar-nav navbar-right">
					<div className="nav navbar-nav navbar-right">
						<div className="btn-toolbar pull-right" role="toolbar">
							<div className="btn-group" role="group">
								<button type="button" className="btn btn-default navbar-btn">What&#x0027s in your Fridge?</button>
							</div>
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-default navbar-btn">Add a Recipe</button>
                            </div>
							<button type="button" className="btn btn-default navbar-btn">
								<span className="glyphicon glyphicon-book"></span>
								Cookbook
							</button>
							<div className="btn-group" role="group">
								<button type="button" className="btn btn-default navbar-btn navbar-btn">
									<span className="glyphicon glyphicon-lock"></span>
								</button>
								<div className="btn-group" role="group">
									<button type="button" className="btn btn-default dropdown-toggle navbar-btn roundedCaret" data-toggle="dropdown">
										<span className="caret"></span>
									</button>
									<ul className="dropdown-menu">
										<li><a href="#">Log out...</a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</ul>
			</div>
		</div>
	</nav>

	<div className="container">
		<div className="row">
			<div className="col-md-2">
				<div className="panel lemato-left-nav">
					<div className="">
						<h4>Profile</h4>
					</div>
					<hr />
					<ul className="nav nav-pills nav-stacked">
						<li role="presentation">
							<a href="#"><span className="glyphicon glyphicon-book"></span>
							Cookbook</a>
						</li>
						<li role="presentation">
							<a href="#"><span className="glyphicon glyphicon-cog"></span>
							Account Settings</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="col-md-7 no-margin">
				<div className="row">
					<div className="col-md-12 text-center">
						<div className="panel">
							<div className="panel-body cookbook-header">
								<span className="glyphicon glyphicon-cutlery tilt-left"></span>
								<h1>My Cookbook</h1>
								<span className="glyphicon glyphicon-cutlery tilt-right"></span>
							</div>
							<div className="panel-footer">
								<div className="media">
									<div className="media-left">
										<a href="#">
											<img className="media-object result-pic" src="img/brownie-egg.jpg" alt="brownie-egg">
										</a>
									</div>
									<div className="media-body">
										<h4 className="media-heading">Egg Brownie</h4>
										A brownie but in the shape of an egg. Trick your friends with this delicious treat. Only 200 calories!
									</div>
									<div className="media-right recipe-vote">
										<a href="#"><span className="glyphicon glyphicon-arrow-up"></span></a>
										<div>5129</div>
										<a href="#"><span className="glyphicon glyphicon-arrow-down"></span></a>
									</div>
								</div>
								<hr />
								<div className="media">
									<div className="media-left">
										<a href="#">
											<img className="media-object result-pic" src="img/brownie1.png" alt="brownie">
										</a>
									</div>
									<div className="media-body">
										<h4 className="media-heading">Double Fudge Brownie</h4>
										A delicious double fudge brownie. Even a monkey could bake these!
									</div>
									<div className="media-right recipe-vote">
										<a href="#"><span className="glyphicon glyphicon-arrow-up"></span></a>
										<div>4459</div>
										<a href="#"><span className="glyphicon glyphicon-arrow-down"></span></a>
									</div>
								</div>
								<hr />
								<div className="media">
									<div className="media-left">
										<a href="#">
											<img className="media-object result-pic" src="img/brownie-sundae.jpg" alt="brownie-sundae">
										</a>
									</div>
									<div className="media-body">
										<h4 className="media-heading">Brownie Sundae</h4>
										What&#x0027s more delicous than a brownie? A brownie with ice cream!
									</div>
									<div className="media-right recipe-vote">
										<a href="#"><span className="glyphicon glyphicon-arrow-up"></span></a>
										<div>3479</div>
										<a href="#"><span className="glyphicon glyphicon-arrow-down"></span></a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
		)
	}
}
