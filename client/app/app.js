import React from 'react';
import ReactDOM from 'react-dom';
import Feed from './components/feed';
import Cookbook from './components/cookbook';
import Results from './components/results';
import Settings from './components/settings';
import RecipePage from './components/recipePage';
import {IndexRoute, Router, Route, browserHistory, hashHistory} from 'react-router';
import AdvancedSearch from './components/advancedSearch';
import NavBar from './components/navbar';
import NewRecipe from './components/newRecipe';
import ErrorBanner from './components/errorbanner';

class FeedPage extends React.Component {
	render() {
		return <Feed user={1}/>;
	}
}

class Cookiebook extends React.Component {
	render() {
		return <Cookbook user ={1}/>;
	}
}

class Result extends React.Component{
	render(){
		return <Results recipe={1}/>
	}
}

class Setting extends React.Component{
	render(){
		return <Settings user = {1}/>
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
			<div>
				<div className="row">
            <div className="col-md-12">
              <ErrorBanner />
            </div>
          </div>
				<NavBar/>
				{this.props.children}
			</div>
		);
	}
}


ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			{/* Show the Feed at / */}
			<IndexRoute component={FeedPage}/>
			<Route path="/" component={FeedPage}/>
			<Route path="/results" component={SearchResultsPage}/>
			<Route path="/settings" component={Setting}/>
			<Route path="/search" component={AdvancedSearch}/>
			<Route path="/recipePage/:id" component={RecipePage}/>
			<Route path="/newRecipe" component={NewRecipe}/>
			<Route path="/cookbook" component={Cookiebook} />
		</Route>
	</Router>
), document.getElementById('wholeFoods'));
