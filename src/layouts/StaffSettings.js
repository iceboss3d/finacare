import React, { Component } from "react";

export default class StaffSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirmation: "",
      staffLevel: "",
      success: null,
      error: "",
      staff: [],
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

  createStaff = e => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      passwordConfirmation,
      staffLevel
    } = this.state;
    fetch(`http://localhost:3005/api/v1/super-admin/staff/create`, {
      method: "post",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        password,
        passwordConfirmation,
        staffLevel
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
          window.location.href = '/settings/staff';
        } else {
          this.setState({
            success: "failed",
            error: res.errors[0].message,
          });
        }
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    fetch(`http://localhost:3005/api/v1/staff`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem("user"),
      }
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if(res.success){
        this.setState({
          staff: res.data.allStaff,
        });
      }
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="container mt-4">
        <h3>Staff Settings</h3>
        <p className="lead">Register and view Staff</p>
        <button
          className="btn btn-success btn-block"
          type="button"
          data-toggle="modal"
          data-target="#createStaffModal"
        >
          Register Staff
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Access Level</th>
            </tr>
          </thead>
          <tbody>
            {this.state.staff.length >= 1 ?
            this.state.staff.map((staff, index) => (
              <tr key={index}>
              <td>{staff.uniqueId}</td>
              <td>{staff.Profile.fullname}</td>
              <td>{staff.email}</td>
              <td>{staff.Profile.phone}</td>
              <td>{staff.level}</td>
            </tr>
            )) :
            <tr><td>No Staff found</td></tr>  
          }
          </tbody>
        </table>
        {/* Create Staff Modal Section*/}
        <div
          className="modal fade"
          id="createStaffModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="createStaffModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="createStaffModalLabel">
                  Register Staff
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              {this.state.success === "done" ? (
                  <div className="alert alert-success">Staff Created</div>
                ) : this.state.success === "failed" ? (
                  <div className="alert alert-danger">{this.state.error}</div>
                ) : null}
                <form onSubmit={this.createStaff}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      placeholder="First Name"
                      required
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      placeholder="Last Name"
                      required
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email Address"
                      required
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      placeholder="Phone Number"
                      required
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      required
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      name="passwordConfirmation"
                      placeholder="Confirm Password"
                      required
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <select
                      name="staffLevel"
                      className="form-control"
                      required
                      onChange={this.handleChange}
                    >
                      <option value="">Access Level</option>
                      <option value="SuperAdmin">Super Admin</option>
                      <option value="Admin">Admin</option>
                      <option value="Officer">Officer</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-success btn-block">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-block"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
