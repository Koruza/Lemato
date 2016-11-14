import React from 'react';
import ReactDOM from 'react-dom';
import Feed from './components/feed';
import cookbook from './components/cookbook';
import Results from './components/results';
import Settings from './components/settings';
import recipePage from './components/recipePage';
import {IndexRoute, Router, Route, browserHistory} from 'react-router';
import AdvancedSearch from './components/advancedSearch';
// import {Link} from 'react-router';

/**
* The Feed page. We created a new component just
* to fix the userId at 4.
*/
class FeedPage extends React.Component {
	render() {
		return <Feed user={1}/>;
	}
}

/**
* The Feed page. We created a new component just
* to fix the userId at 4.
*/
class RecipePage extends React.Component {
	render() {
		return (
			<p>This is the profile page for a user
					with ID {this.props.params.id}.</p>
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
			<IndexRoute component ={FeedPage}/>
			<Route path="results" component={Results}/>
			<Route path="settings" component={Settings}/>
			<Route path="search" component={AdvancedSearch}/>
			<Route path="recipe" component={recipePage}>
				<Route path="/recipe/:recipeID" component={recipePage}/>
			</Route>
			<Route path="cookbook" component={cookbook}/>
		</Route>
	</Router>
), document.getElementById('wholePage'));
