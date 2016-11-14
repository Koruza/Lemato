import React from 'react';
import ReactDOM from 'react-dom';
import {Feed} from './components/feed';
import {IndexRoute, Router, Route, browserHistory} from 'react-router'
import {AdvancedSearch} from './components/advancedSearch'
// import {Link} from 'react-router';

/**
* The Feed page. We created a new component just
* to fix the userId at 4.
*/
class FeedPage extends React.Component {
	render() {
		return <Feed user={1}/> ;
	}
}

/**
* The Recipe page. We created a new component just
* to make the recipe page dynamic based off input.
*/
class RecipePage extends React.Component {
	render() {
		var recipe = this.props.params.id;
		return (
			<div>
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
                    <div
                         className="btn-group"
                         role="group">
                      <button
                              className="btn btn-default"
                              type="button">
                        <span className="glyphicon glyphicon-plus-sign"></span> Save
                      </button>
                      <button
                              className="btn btn-default"
                              type="button">
                        <span className="glyphicon glyphicon-share-alt"></span> Share
                      </button>
                    </div>
                    <hr className="small-bot-padding" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <img
                         src="img/brownie-egg.jpg"
                         className="center-block"
                         alt="" />
                  </div>
                </div>
              </div>
              <div className="panel-footer">
                <div className="row">
                  <div className="col-md-12 side-padding">
                    <h2>Ingredients</h2>
                    <ul>
                      <li>
                        2 cups white sugar
                      </li>
                      <li>
                        1 cup butter
                      </li>
                      <li>
                        1/2 cup cocoa powder
                      </li>
                      <li>
                        1 teaspoon vanilla extract
                      </li>
                      <li>
                        4 eggs
                      </li>
                      <li>
                        1 1/2 cups all-purpose flour
                      </li>
                      <li>
                        1/2 teaspoon baking powder
                      </li>
                      <li>
                        1/2 teaspoon salt
                      </li>
                    </ul>
                  </div>
                </div>
                <hr />
                <div className="row no-padding">
                  <div className="col-md-12 side-padding">
                    <h2>Instructions</h2>
                    <ol>
                      <li>
                        Poke a 1cm hole in the bottom of the eggs. Drain eggs out.
                      </li>
                      <li>
                        Clean shells in cold water and prepare a bowl with salt water (11g salt and 100g water). Completely submerge shells in saltwater for 30 minutes, then rinse with
                        cold water and let dry.
                      </li>
                      <li>
                        Preheat oven to 175 &#x2103 / 350 &#x2109.
                      </li>
                      <li>
                        Melt butter and then mix ingredients together in a bowl in the order given.
                      </li>
                      <li>
                        Add about 1 teaspoon sunflower oil inside shells. Turn shell until inside is completely covered and remove excess oil.
                      </li>
                      <li>
                        Fill each shell until it&#x0027s about 2/3 full.
                      </li>
                      <li>
                        Bake for 25 to 30 minutes.
                      </li>
                      <li>
                        Let cool and then enjoy!
                      </li>
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
                            <img
                                 src="img/brownie1.png"
                                 className=""
                                 alt="" />
                            <div className="media-body">
                              <Link to="/recipePage">Double Fudge Brownie</Link>: A delicious double fudge brownie. Even a monkey could bake these!
                            </div>
                          </li>
                          <li className="media">
                            <img
                                 src="img/brownie-sundae.jpg"
                                 className=""
                                 alt="" />
                            <div className="media-body">
                              <Link to="/recipePage">Brownie Sundae</Link>: What's more delicous than a brownie? A brownie with ice cream!
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
    </div>
		);
	}
}

/**
* The primary component in our application.
* The Router will give it different child Components
* as the user clicks around the application.
*
* If we implemented all of Facebook, this App would
* also contain Component objects for the left and
* right content panes.
*/

class App extends React.Component {
	render() {
		return (
			<div>{this.props.children}</div>
		)
	}
}
//         return (
//             <div>{this.props.children}</div>
//         )
//     }
// }
//
//
// const App = React.createClass({
//   render() {
//     return (
//       <div>
//         <h1>App</h1>
//         {/* change the <a>s to <Link>s */}
//         <ul>
//           <li><Link to="/search">About</Link></li>
//           // <li><Link to="/inbox">Inbox</Link></li>
//         </ul>
//
//         {/*
//           next we replace `<Child>` with `this.props.children`
//           the router will figure out the children for us
//         */}
//         {this.props.children}
//       </div>
//     )
//   }
// }

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			{/* Show the Feed at / */}
			//<IndexRoute component ={AdvancedSearch}/>
			<IndexRoute component={FeedPage}/>
			<Route path="search" component={AdvancedSearch}/>
		</Route>
	</Router>
), document.getElementById('wholePage'));
