import React, { Component } from "react";

export default class AccountSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountName: "",
      interestRate: "",
      minimumBalance: "",
      success: null,
      error: "",
      authorised: true,
      accountType: []
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

  createAccountType = e => {
    e.preventDefault();
    const {
      accountName,
      interestRate,
      minimumBalance,
    } = this.state;
    fetch(`http://localhost:3005/api/v1/super-admin/account-type/create`, {
      method: "post",
      body: JSON.stringify({
        accountName,
        interestRate,
        minimumBalance,
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
          window.location.href = '/settings/accounts';
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
    fetch(`http://localhost:3005/api/v1/account-types`, {
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
          accountType: res.data.accountTypes,
        });
      } else {
        this.setState({
          authorised: false,
        })
      }
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="container mt-4">
        <h3>Account Settings</h3>
        <p className="lead">Create and view Account Types</p>
        <button
          className="btn btn-success btn-block"
          type="button"
          data-toggle="modal"
          data-target="#createAccountModal"
        >
          Create Account
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Interest Rate</th>
              <th>Minimum Balance</th>
            </tr>
          </thead>
          <tbody>
            {this.state.accountType.length >= 1 ? (
              this.state.accountType.map((account, index) => (
                <tr key={index}>
                  <td>{account.name}</td>
                  <td>{account.interestRate}</td>
                  <td>{account.minimumBalance}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No Accounts found</td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Create Account Type Modal Section*/}
        <div
          className="modal fade"
          id="createAccountModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="createAccountModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="createAccountModalLabel">
                  Create Account Type
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
                  <div className="alert alert-success">Account Type Created</div>
                ) : this.state.success === "failed" ? (
                  <div className="alert alert-danger">{this.state.error}</div>
                ) : null}
                <form onSubmit={this.createAccountType}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="accountName"
                      placeholder="Account Name"
                      required
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control"
                      name="interestRate"
                      placeholder="Interest Rate"
                      required
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control"
                      name="minimumBalance"
                      placeholder="Minimum Balance"
                      required
                      onChange={this.handleChange}
                    />
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
