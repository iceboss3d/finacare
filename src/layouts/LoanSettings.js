import React, { Component } from "react";

export default class LoanSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loanName: "",
      interestRate: "",
      minimumAmount: "",
      maximumAmount: "",
      payCycle: "",
      success: null,
      error: "",
      authorised: true,
      loanType: []
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

  createLoanType = e => {
    e.preventDefault();
    const {
      loanName,
      interestRate,
      minimumAmount,
      maximumAmount,
      payCycle,
    } = this.state;
    fetch(`http://localhost:3005/api/v1/super-admin/loan-type/create`, {
      method: "post",
      body: JSON.stringify({
        loanName,
        interestRate,
        minimumAmount,
        maximumAmount,
        payCycle,
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
          window.location.href = '/settings/loans';
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
    fetch(`http://localhost:3005/api/v1/loan-types`, {
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
          loanType: res.data.loanTypes,
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
        <h3>Loan Settings</h3>
        <p className="lead">Create and view Loan Types</p>
        <button
          className="btn btn-success btn-block"
          type="button"
          data-toggle="modal"
          data-target="#createLoanModal"
        >
          Create Loan
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Interest Rate</th>
              <th>Minimum Amount</th>
              <th>Maximum Amount</th>
              <th>Pay Cycle</th>
            </tr>
          </thead>
          <tbody>
            {this.state.loanType.length >= 1 ? (
              this.state.loanType.map((loan, index) => (
                <tr key={index}>
                  <td>{loan.name}</td>
                  <td>{loan.interestRate}</td>
                  <td>{loan.minimumAmount}</td>
                  <td>{loan.maximumAmount}</td>
                  <td>{loan.payCycle}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No Loans found</td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Create Loan Type Modal Section*/}
        <div
          className="modal fade"
          id="createLoanModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="createLoanModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="createLoanModalLabel">
                  Create Loan Type
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
                  <div className="alert alert-success">Loan Type Created</div>
                ) : this.state.success === "failed" ? (
                  <div className="alert alert-danger">{this.state.error}</div>
                ) : null}
                <form onSubmit={this.createLoanType}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="loanName"
                      placeholder="Loan Name"
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
                      name="minimumAmount"
                      placeholder="Minimum Amount"
                      required
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control"
                      name="maximumAmount"
                      placeholder="Maximum Amount"
                      required
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <select className="form-control" name="payCycle" required onChange={this.handleChange}>
                        <option value="">Pay Cycle</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
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
