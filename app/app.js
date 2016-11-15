import React from 'react';
import ReactDOM from 'react-dom';
import Feed from './components/feed';
import Cookbook from './components/cookbook';
import Results from './components/results';
import Settings from './components/settings';
import RecipePage from './components/recipePage';
import {IndexRoute, Router, Route, browserHistory,hashHistory} from 'react-router';
import AdvancedSearch from './components/advancedSearch';


class FeedPage extends React.Component {
	render() {
		console.log("feedpageRendah :3");
		return <Feed user={1}/>;
	}
}

class Cookiebook extends React.Component{
  render(){
    return(<Cookbook user = {1}/>);
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
		console.log("apprandeh :3");
		return (
			<div>{this.props.children}</div>
		);
	}
}


ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			{/* Show the Feed at / */}
			<IndexRoute component={FeedPage}/>
			<Route path="home" component={FeedPage}/>
			<Route path="results" component={Results}/>
			<Route path="settings" component={Settings}/>
			<Route path="search" component={AdvancedSearch}/>
			<Route path="/recipe/:recipeID" component={RecipePage}/>
			<Route path="cookbook" component={Cookiebook} />
		</Route>
	</Router>
), document.getElementById('wholeFoods'));
