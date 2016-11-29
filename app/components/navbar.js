import React from 'react';
import { Link } from 'react-router';

export default class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contents: []
    };
  }

  // refresh() {
  //   getUserData(this.props.user, (userData) => {
  //     this.setState(userData);
  //   });
  // }

  render() {
    return (
      <div>
          <nav className="navbar navbar-fixed-top navbar-default">
      <div className="container">
          <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/" className="navbar-brand">
                  <span><img src="img/lemato.png"/> Lemato</span>
              </Link>
          </div>
          <div className="collapse navbar-collapse " id="bs-example-navbar-collapse-1">
              <form className="navbar-form navbar-left" role="search">
                  <div className="input-group">
                      <input type="text" className="form-control lemato-search" placeholder="Search Lemato"/>
                      <span className="input-group-btn">
                        <button type="submit" className="btn btn-default">
                        <Link to="/results" className="glyphicon glyphicon-search"></Link></button>
                      </span>
                  </div>
              </form>
              <ul className="nav navbar-nav navbar-right">
                  <div className="nav navbar-nav navbar-right">
                      <div className="btn-toolbar pull-right" role="toolbar">
                          <div className="btn-group" role="group">
                              <Link to="/search" className="btn btn-default navbar-btn">Advanced Search</Link>
                          </div>
                          <div className="btn-group" role="group">
                              <Link to="/newRecipe" className="btn btn-default navbar-btn">Add a Recipe</Link>
                          </div>
                          <Link to="/cookbook" className="btn btn-default navbar-btn">
                            <span className="glyphicon glyphicon-book"></span> Cookbook
                          </Link>
                          <div className="btn-group" role="group">
                              <Link to="/settings" className="btn btn-default navbar-btn navbar-btn">
                                <span className="glyphicon glyphicon-cog"></span>
                              </Link>
                              <div className="btn-group" role="group">
                                  <button type="button" className="btn btn-default dropdown-toggle navbar-btn roundedCaret" data-toggle="dropdown">
                                    <span className="caret"></span>
                                  </button>
                                  <ul className="dropdown-menu">
                                      <li><Link to="/">Log out...</Link></li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </ul>
          </div>
        </div>
  </nav>
      </div>
      );
  }
}
