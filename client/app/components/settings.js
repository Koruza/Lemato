import React from 'react';
import { Link } from 'react-router';
import {updateSettings} from '../server';
import {updatePassword} from '../server';
import {readDocument} from '../database'
import {getUserData} from '../server'

export default class Settings extends React.Component {
  constructor(props) {
    super( props );
    //var user = readDocument('users', this.props.user);
    //this.state = getUserData(this.props.user, callback);
    //this.state = user;
    this.state = {
      contents: []
    };
  }

  refresh() {
   getUserData(this.props.user, (user) => {
     this.setState(user);
   });
  }

  componentDidMount() {
   this.refresh()
  }



  handleNameChange(e){
    e.preventDefault();
    this.setState({fullName: e.target.value});
  }

  handleBioChange(e){
    e.preventDefault();
    this.setState({bio: e.target.value});
  }


  handleUpdate(clickEvent){
    clickEvent.preventDefault();
    var callbackFunction = (updatedState) => {
      this.setState({fullName: updatedState.fullName})
      this.setState({bio: updatedState.bio})
    }
    updateSettings(this.state._id, this.state.fullName, this.state.bio, callbackFunction);
  }

  handleOldPassword(e){
    e.preventDefault();
    this.setState({oldPassword: e.target.value});
  }

  handleNewPassword(e){
  e.preventDefault();
  this.setState({newPassword: e.target.value});
}

  handlePasswordChange(e){
    e.preventDefault();
    this.setState({newPassword2: e.target.value});
  }

  handlePasswordUpdate(clickEvent){
    //if(this.state.oldPassword == this.state.password != this.state.newPassword && this.state.newPassword == this.state.newPassword2){
    clickEvent.preventDefault();
    var callbackFunction = (updatedState) => {
      this.setState({password: updatedState.password})
    }
    updatePassword(this.state._id, this.state.newPassword, callbackFunction);
//  }
    ///else{
    //  alert("Try Again!");
    //}
  }

  render() {
    return (
      <div>
      <div className="container">
        <div className="row">

          <div className="col-md-2">
            <div className="panel lemato-left-nav">
              <div className="">
                <h4>Profile</h4>
              </div>
              <hr />
              <ul className="nav nav-pills nav-stacked">
                <li role="presentation">
                  <Link to={"/cookbook"}><span className="glyphicon glyphicon-book"></span>
                  Cookbook</Link>
                </li>
                <li role="presentation">
                  <Link to="/settings"><span className="glyphicon glyphicon-cog"></span>
                  Account Settings</Link>
                </li>
              </ul>
            </div>
          </div>


          <div className="col-md-7">
            <div className="panel panel-default">
              <div className="panel-heading setting-label">Profile Settings</div>
              <div className="panel-body">
                <label className="profile-label">Name</label>
                <input type="text" className="form-control name-input" value={this.state.fullName} onChange={(e) => this.handleNameChange(e)}/>
                <br />
                <label className="profile-label">Bio</label>
                <textarea className="form-control bio-input" rows="3"
                value={this.state.bio} onChange={(e) => this.handleBioChange(e)}></textarea>
              <br />
              <button type="button" className="btn btn-default update-button" onClick={(e) => this.handleUpdate(e)}>
                  Update Profile</button>
                </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading setting-label">Account Settings</div>
              <div className="panel-body account-settings">
                <label>Change password</label> <br />
                Old Password:
                <input type="text" className="form-control old-password" value={this.state.oldPassword} onChange={(e) => this.handleOldPassword(e)}/>
                <br />
                New Password:
                <input type="text" className="form-control new-password" value={this.state.newPassword} onChange={(e) => this.handleNewPassword(e)}/>
                <br />
                Confirm New Password:
                <input type="text" className="form-control cf-new-password" value={this.state.newPassword2} onChange={(e) => this.handlePasswordChange(e)}/>
                <br />
                <button type="button" className="btn btn-default update-button" onClick={(e) => this.handlePasswordUpdate(e)}>Update password</button>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    )
  }
}
