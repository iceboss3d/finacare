import React, { Component } from "react";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oldPassword: "",
      newPassword: "",
      newPasswordRepeat: "",
      success: "",
      error: ""
    };
  }

  handleChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handlePasswordChange = e => {
    e.preventDefault();
    const { oldPassword, newPassword, newPasswordRepeat } = this.state;
    fetch(`http://localhost:3005/api/v1/auth/update-password`, {
      method: "put",
      body: JSON.stringify({
        oldPassword,
        newPassword,
        newPasswordRepeat
      }),
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("user")
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.setState({
            success: "done"
          });
        } else {
          this.setState({
            success: "failed",
            error: res.errors[0].message
          });
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="container">
        <h3>Profile</h3>
        <p className="lead">Update your login password</p>

        <div style={{ width: "24em" }}>
          {this.state.success === "done" ? (
            <div className="alert alert-success">Password Updated</div>
          ) : this.state.success === "failed" ? (
            <div className="alert alert-danger">
              Password Update Failed {this.state.error}
            </div>
          ) : null}
          <form onSubmit={this.handlePasswordChange}>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="oldPassword"
                placeholder="Old Password"
                required
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="newPassword"
                placeholder="New Password"
                required
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="newPasswordRepeat"
                placeholder="Repeat New Password"
                required
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
