import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, Router, Route, browserHistory} from 'react-router'

/**
* The Feed page. We created a new component just
* to fix the userId at 4.
*/
class FeedPage extends React.Component {
    render() {
        return <feed user={1}/>;
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

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            {/* Show the Feed at / */}
            <IndexRoute component={FeedPage}/>
        </Route>

    </Router>
), document.getElementById('recipe-share'));
