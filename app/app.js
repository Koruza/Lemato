import React from 'react';
import ReactDOM from 'react-dom';
import Feed from './components/feed';
import Cookbook from './components/cookbook';
import Results from './components/results';
import Settings from './components/settings';
import RecipePage from './components/recipePage';
import {IndexRoute, Router, Route, browserHistory} from 'react-router';
import AdvancedSearch from './components/advancedSearch';


class FeedPage extends React.Component {
	render() {
		return <Feed user = {1}/>;
	}
}




// class RecipePage extends React.Component {
// 	render() {
// 		return (
// 			<p>This is the profile page for a user
// 					with ID {this.props.params.id}.</p>
// 		);
// 	}
// }



class App extends React.Component {
	render() {
		return (
			<div>{this.props.children}</div>
		)
	}
}


ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			{/* Show the Feed at / */}
			<IndexRoute component ={FeedPage}/>
			<Route path="results" component={Results}/>
			<Route path="settings" component={Settings}/>
			<Route path="search" component={AdvancedSearch}/>
			<Route path="recipe" component={RecipePage}>
				<Route path="/recipe/:recipeID" component={RecipePage}/>
			</Route>
			<Route path="cookbook" component={Cookiebook}/>
		</Route>
	</Router>
), document.getElementById('wholePage'));
