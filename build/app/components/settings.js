import React from 'react';

export default class results extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.data
  }

  render() {
  //  var data = this.state

    return (
      <div>
      <div className="container">
        <div className="row">
          // Left Sidebar
          <div className="col-md-2">
            <div className="panel lemato-left-nav">
              <div className="">
                <h4>Profile</h4>
              </div>
              <hr />
              <ul className="nav nav-pills nav-stacked">
                <li role="presentation">
                  <a href="#"><span className="glyphicon glyphicon-book"></span>
                  Cookbook</a>
                </li>
                <li role="presentation">
                  <a href="#"><span className="glyphicon glyphicon-cog"></span>
                  Account Settings</a>
                </li>
              </ul>
            </div>
          </div>

          //Settings
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
                <input className="form-control name-input" value="Somebody's Name" />
                <label className="profile-label">Bio</label>
                <textarea className="form-control bio-input" rows="3"
                placeholder="Tell a little bit about yourself"></textarea>
                <button type="button" className="btn btn-default update-button">Update Profile</button>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading setting-label">Account Settings</div>
              <div className="panel-body account-settings">
                <label>Change password</label>
                <input className="form-control old-password" placeholder="Old password" />
                <input className="form-control new-password" placeholder="New password" />
                <input className="form-control cf-new-password" placeholder="Confirm New password" />
                <button type="button" className="btn btn-default update-button">Update password</button>
                <hr />
                <label>Delete account</label>
                <br />Once you delete your account, there is no going back.
                  Please be certain.<br />
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
