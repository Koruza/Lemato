import React from 'react';
import ReactDOM from 'react-dom';
import Feed from './components/feed';
import Cookbook from './components/cookbook';
import ResultsItem from './components/resultsItem';
import Settings from './components/settings';
import RecipePage from './components/recipePage';
import {IndexRoute, Router, Route, browserHistory, hashHistory} from 'react-router';
import AdvancedSearch from './components/advancedSearch';
import NavBar from './components/navbar';
import NewRecipe from './components/newRecipe';
import ErrorBanner from './components/errorbanner';
import {searchForRecipes} from './server';
import ResultsPage from './components/resultsPage';

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

class Results extends React.Component {
  getSearchTerm() {
    // If there's no query input to this page (e.g. /foo instead of /foo?bar=4),
    // query may be undefined. We have to check for this, otherwise
    // JavaScript will throw an exception and die!
    var queryVars = this.props.location.query;
    var searchTerm = "";
    if (queryVars && queryVars.q) {
      searchTerm = queryVars.q;
      // Remove extraneous whitespace.
      searchTerm.trim();
    }
    return searchTerm;
  }

  render() {
    var searchTerm = this.getSearchTerm();
    // By using the searchTerm as the key, React will create a new
    // SearchResults component every time the search term changes.
    return (
      <ResultsPage key={searchTerm} searchTerm={searchTerm} />
    );
  }
}

// class ResultsPage extends React.Component{
//   constructor(props) {
//     super(props);
//     this.state = {
//       loaded: false,
//       invalidSearch: false,
//       results: []
//     };
//   }
//
//   refresh() {
//     var searchTerm = this.props.searchTerm;
//     if (searchTerm !== "") {
//       searchForRecipes(searchTerm, (result) => {
//         this.setState({
//           loaded: true,
//           results: result
//         });
//       });
//     } else {
//       this.setState({
//         invalidSearch: true
//       });
//     }
//   }
//
//   componentDidMount() {
//     this.refresh();
//   }
//
//   render() {
//   	this.state;
//     return (
//       <div>
//         {
//           this.state.results.map((result) => {
//             return (
//               <ResultsItem key={result} data={result} />
//             )
//           })
//         }
//       </div>
//     );
//   }
// }

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
			<Route path="/results" component={Results}/>
			<Route path="/settings" component={Setting}/>
			<Route path="/search" component={AdvancedSearch}/>
			<Route path="/recipePage/:id" component={RecipePage}/>
			<Route path="/newRecipe" component={NewRecipe}/>
			<Route path="/cookbook" component={Cookiebook} />
		</Route>
	</Router>
), document.getElementById('wholeFoods'));
