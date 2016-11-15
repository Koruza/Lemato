import React from 'react';
import { Link } from 'react-router';
import {updateSettings} from '../server';
import {updatePassword} from '../server';

export default class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      user: this._id,
      newName: this.fullName,
      newBio: this.bio,
      newPassword: this.password
    }
    //the User ID
    console.log(props);
  }

  handleNameChange(e){
    e.preventDefault();
    this.setState({newName: e.target.value});
  }

  handleBioChange(e){
    e.preventDefault();
    this.setState({newBio: e.target.value});
  }


  handleUpdate(e){
    e.preventDefault();
    updateSettings(this.state.user, this.state.newName, this.state.newBio);
  }


  handlePasswordChange(e){
    e.preventDefault();
    this.setState({password: e.target.value});
  }

  handlePasswordUpdate(e){
    e.preventDefault();
    updatePassword(this.state.user, this.state.newPassword);
  }

  render() {
  //  var data = this.state

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
                <label>Profile Picture</label>
                <div className="media">
                  <div className="media-left">
                    PIC
                  </div>
                  <div className="media-body">
                    <button type="button" className="btn btn-default photo-button">Upload new picture</button>
                  </div>
                </div>
                <label className="profile-label">Name</label>
                <input className="form-control name-input" placeholder={this.props.fullName} onKey={(e) => this.handleNameChange(e)}/>
                <br />
                <label className="profile-label">Bio</label>
                <textarea className="form-control bio-input" rows="3"
                placeholder="Tell a little bit about yourself" onKey={(e) => this.handleBioChange(e)}></textarea>
              <br />
              <button type="button" className="btn btn-default update-button" onClick={(e) => this.handleUpdate(e)}>
                  Update Profile</button>
                </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading setting-label">Account Settings</div>
              <div className="panel-body account-settings">
                <label>Change password</label>
                <input className="form-control old-password" placeholder="Old password" />
                <br />
                <input className="form-control new-password" placeholder="New password" onKey={(e) => this.handlePasswordChange(e)}/>
                <br />
                <input className="form-control cf-new-password" placeholder="Confirm New password" />
                <br />
                <button type="button" className="btn btn-default update-button" onClick={(e) => this.handlePasswordUpdate(e)}>Update password</button>
                <hr />
                <label>Delete account</label>
                <br />Once you delete your account, there is no going back.
                  Please be certain. <br />
                <br />
                <button type="button" className="btn btn-default delete-button">
                  Delete your account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    )
  }
}
