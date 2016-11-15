import React from 'react';
import { Link } from 'react-router';

export default class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contents: []
    };
  }

  refresh() {
    getUserData(this.props.user, (userData) => {
      this.setState(userData);
    });
  }

  render() {
    return (
      <div>
          <nav class="navbar navbar-fixed-top navbar-default">
      <div class="container">
          <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="#">
                  <span><img src="img/lemato.png"/> Lemato</span>
              </a>
          </div>
          <div class="collapse navbar-collapse " id="bs-example-navbar-collapse-1">
              <form class="navbar-form navbar-left" role="search">
                  <div class="input-group">
                      <input type="text" class="form-control lemato-search" placeholder="Search Lemato">
                      <span class="input-group-btn">
                        <button type="submit" class="btn btn-default">
                        <span class="glyphicon glyphicon-search"></span></button>
                      </span>
                  </div>
              </form>
              <ul class="nav navbar-nav navbar-right">
                  <div class="nav navbar-nav navbar-right">
                      <div class="btn-toolbar pull-right" role="toolbar">
                          <div class="btn-group" role="group">
                              <button type="button" class="btn btn-default navbar-btn">What's in your Fridge?</button>
                          </div>
                          <div class="btn-group" role="group">
                              <button type="button" class="btn btn-default navbar-btn">Add a Recipe</button>
                          </div>
                          <button type="button" class="btn btn-default navbar-btn">
                            <span class="glyphicon glyphicon-book"></span> Cookbook
                          </button>
                          <div class="btn-group" role="group">
                              <button type="button" class="btn btn-default navbar-btn navbar-btn">
                                <span class="glyphicon glyphicon-lock"></span>
                              </button>
                              <div class="btn-group" role="group">
                                  <button type="button" class="btn btn-default dropdown-toggle navbar-btn roundedCaret" data-toggle="dropdown">
                                    <span class="caret"></span>
                                  </button>
                                  <ul class="dropdown-menu">
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
      </div>
      );
  }
}
