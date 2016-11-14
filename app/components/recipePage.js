import React from 'react';
import {Link} from 'react-router';

export default class recipePage extends React.Component {
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
						<input type="text" className="form-control lemato-search" placeholder="Search Lemato">
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
                		Cookbook</button>
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
			<div className="col-md-7 col-md-offset-2">
				<div className="panel panel-default lemato-main-feed">
					<div className="panel-body">
						<div className="row">
							<div className="col-md-12">
								<div className="media">
									<h1 className="text-center">Easter Egg Brownies!</h1>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-12 text-center">
								<hr />
								<div className="btn-group" role="group">
									<button className="btn btn-default" type="button">
											<span className="glyphicon glyphicon-plus-sign"></span>
											Save
										</button>
									<button className="btn btn-default" type="button">
											<span className="glyphicon glyphicon-share-alt"></span>
											Share
										</button>
								</div>
								<hr className="small-bot-padding">
							</div>
						</div>
						<div className="row">
							<div className="col-md-12">
								<img src="img/brownie-egg.jpg" className="center-block" alt="">
							</div>
						</div>
					</div>
					<div className="panel-footer">
						<div className="row">
							<div className="col-md-12 side-padding">
								<h2>Ingredients</h2>
								<ul>
									<li>2 cups white sugar</li>
									<li>1 cup butter</li>
									<li>1/2 cup cocoa powder</li>
									<li>1 teaspoon vanilla extract</li>
									<li>4 eggs</li>
									<li>1 1/2 cups all-purpose flour</li>
									<li>1/2 teaspoon baking powder</li>
									<li>1/2 teaspoon salt</li>
								</ul>
							</div>
						</div>

						<hr />

						<div className="row no-padding">
							<div className="col-md-12 side-padding">
								<h2>Instructions</h2>
								<ol>
									<li>Poke a 1cm hole in the bottom of the eggs. Drain eggs out.</li>
									<li>Clean shells in cold water and prepare a bowl with salt water (11g salt and 100g water). Completely submerge shells in saltwater for 30 minutes, then rinse with cold water and let dry.</li>
									<li>Preheat oven to 175 &#x2103 / 350 &#x2109.</li>
									<li>Melt butter and then mix ingredients together in a bowl in the order given.</li>
									<li>Add about 1 teaspoon sunflower oil inside shells. Turn shell until inside is completely covered and remove excess oil.</li>
									<li>Fill each shell until it&#x0027s about 2/3 full.</li>
									<li>Bake for 25 to 30 minutes.</li>
									<li>Let cool and then enjoy!</li>
								</ol>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="col-md-3">
				<div className="panel panel-default lemato-right-sidebar">
					<div className="panel-body">
						<div className="row">
							<div className="col-md-12">
								<div className="row">
									<div className="col-md-12">
										<h4>Related Recipes:</h4>
									</div>
								</div>
								<div className="row">
									<div className="col-md-12">
										<ul className="media-list">
											<li className="media">
												<img src="img/brownie1.png" className="" alt="">
												<div className="media-body">
													<a href="#">Double Fudge Brownie</a>: A delicious double fudge brownie. Even a monkey could bake these!
												</div>
											</li>
											<li className="media">
												<img src="img/brownie-sundae.jpg" className="" alt="">
												<div className="media-body">
													<a href="#">Brownie Sundae</a>: What&#x0027s more delicous than a brownie? A brownie with ice cream!
												</div>
											</li>
											<li className="media">
												<div className="media-left media-top">
													<span className="caret"></span>
												</div>
												<div className="media-body">
													<a href="#">See More</a>
												</div>
											</li>
										</ul>
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
