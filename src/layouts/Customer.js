import React, { Component } from "react";

export default class Customer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
      customer: {},
      accounts: [],
      accountOfficer: "",
      success: "",
      error: "",
      loading: true,
      success1: "",
      error1: "",
      actType: "",
      contributionAmount: "",
      contributionFrequency: "",
      accountNumber: "",
      transactionType: "",
      referenceNo: "",
      amount: "",
      description: "",
      success2: "",
      error2: "",
      message2: "",
      accountType: [],
      loanType: [],
      loanAct: "",
      typeLoan: "",
      requestAmount: "",
      loanRefNo: "",
      purpose: "",
      duration: ""
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

  createCustomerAccount = e => {
    e.preventDefault();
    const { actType, contributionAmount, contributionFrequency } = this.state;
    fetch(`http://localhost:3005/api/v1/fin-account/create/${this.state.id}`, {
      method: "post",
      body: JSON.stringify({
        actType,
        contributionAmount,
        contributionFrequency
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
            success1: "done"
          });
          window.location.href = `/customers/${this.state.id}`;
        } else {
          this.setState({
            success1: "failed",
            error1: res.errors[0].message
          });
        }
      })
      .catch(err => console.log(err));
  };

  handleTransaction = e => {
    e.preventDefault();
    const {
      accountNumber,
      transactionType,
      amount,
      referenceNo,
      description
    } = this.state;
    fetch(`http://localhost:3005/api/v1/transaction/create/${this.state.id}`, {
      method: "post",
      body: JSON.stringify({
        accountNumber,
        transactionType,
        amount,
        referenceNo,
        description
      }),
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("user")
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.success) {
          this.setState({
            success2: "done",
            message2: res.data.message
          });
          window.location.href = `/customers/${this.state.id}`;
        } else {
          this.setState({
            success2: "failed",
            error2: res.errors[0].message
          });
        }
      })
      .catch(err => console.log(err));
  };

  handleLoan = e => {
    e.preventDefault();
    const {
      loanAct,
      typeLoan,
      id,
      requestAmount,
      loanRefNo,
      purpose,
      duration
    } = this.state;
    window.location.href = `/loans/new-application?accountNumber=${loanAct}&loanTypeName=${typeLoan}&customerId=${id}&requestAmount=${requestAmount}&loanRefNo=${loanRefNo}&purpose=${purpose}&duration=${duration}`;
  };

  componentDidMount() {
    fetch(`http://localhost:3005/api/v1/customer/${this.state.id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("user")
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.success) {
          this.setState({
            success: "done",
            customer: res.data.customer,
            accounts: res.data.customer.FinAccounts,
            loading: false
          });
          /*fetch(`http://localhost:3005/api/v1/staff/${res.data.customer.accountOfficerId}`, {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              "access-token": localStorage.getItem("user")
            }
          })
          .then(res => res.json)
          .then(res => {
            console.log(res);
          });*/
        } else {
          this.setState({
            success: "failed",
            error: res.errors[0].message,
            loading: false
          });
        }
      })
      .catch(err => console.log(err));
    fetch(`http://localhost:3005/api/v1/account-types`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("user")
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          accountType: res.data.accountTypes
        });
      })
      .catch(err => console.log(err));
    fetch(`http://localhost:3005/api/v1/loan-types`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("user")
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          loanType: res.data.loanTypes
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="container mt-4">
          <center>
            <p className="lead">Loading...</p>
          </center>
        </div>
      );
    }
    return (
      <div className="container mt-4">
        {this.state.success === "failed" ? (
          <center>
            <p className="lead">{this.state.error}</p>
          </center>
        ) : this.state.success === "done" ? (
          <React.Fragment>
            <div
              className="d-flex"
              style={{ justifyContent: "space-between", flexWrap: "wrap" }}
            >
              <h3>
                {this.state.customer.lastName +
                  ", " +
                  this.state.customer.firstName +
                  " " +
                  this.state.customer.otherNames}
              </h3>
              <button className="btn btn-primary">
                Update Customer Details
              </button>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <button
                  type="button"
                  className="btn btn-success btn-block m-1"
                  data-toggle="modal"
                  data-target="#newTransactionModal"
                >
                  New Transaction
                </button>
              </div>
              <div className="col-md-6">
                <button
                  type="button"
                  className="btn btn-secondary btn-block m-1"
                  data-toggle="modal"
                  data-target="#newLoanModal"
                >
                  New Loan Application
                </button>
              </div>
            </div>
            <div className="card mt-2">
              <div className="card-body">
                <h4>Personal Details</h4>
                <div
                  className="d-flex"
                  style={{ justifyContent: "flex-start", flexWrap: "wrap" }}
                >
                  <div className="col-md-4 p-1">
                    <p>
                      <strong>First Name: </strong>
                      {this.state.customer.firstName}
                    </p>
                  </div>
                  <div className="col-md-4 p-1">
                    <p>
                      <strong>Middle Name: </strong>
                      {this.state.customer.otherNames}
                    </p>
                  </div>
                  <div className="col-md-4 p-1">
                    <p>
                      <strong>Last Name: </strong>
                      {this.state.customer.lastName}
                    </p>
                  </div>
                  <div className="col-md-3 p-1">
                    <p>
                      <strong>Phone: </strong>
                      {this.state.customer.phone}
                    </p>
                  </div>
                  <div className="col-md-3 p-1">
                    <p>
                      <strong>Email: </strong>
                      {this.state.customer.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {this.state.accounts.length < 1 ? (
              <div className="mt-2">
                <center>
                  <p className="lead">This Customer has no accounts yet</p>
                  <button
                    className="btn btn-primary"
                    type="button"
                    data-toggle="modal"
                    data-target="#customerAccountModal"
                  >
                    Add Account
                  </button>
                </center>
              </div>
            ) : (
              <div className="card mt-2">
                <div className="card-body">
                  <div
                    className="d-flex"
                    style={{
                      justifyContent: "space-between",
                      flexWrap: "wrap"
                    }}
                  >
                    <h4>Accounts</h4>
                    <button
                      className="btn btn-primary"
                      type="button"
                      data-toggle="modal"
                      data-target="#customerAccountModal"
                    >
                      Add Account
                    </button>
                  </div>
                  <div
                    className="d-flex"
                    style={{ justifyContent: "flex-start", flexWrap: "wrap" }}
                  >
                    {this.state.accounts.map((accounts, index) => (
                      <div
                        className="card m-1"
                        key={index}
                        style={{ width: "18em" }}
                      >
                        <div className="card-body">
                          <h5>
                            {accounts.actType}
                            <br />
                            <small>{accounts.accountNumber}</small>
                          </h5>
                          <h6>Available Balance</h6>
                          <p className="lead">
                            <strong>
                              {(
                                accounts.ledgerBalance -
                                accounts.outstandingBalance
                              ).toLocaleString("en-NG", {
                                style: "currency",
                                currency: "NGN"
                              })}
                            </strong>
                          </p>
                          <h6>Ledger Balance</h6>
                          <p className="lead">
                            <strong>
                              {parseFloat(
                                accounts.ledgerBalance
                              ).toLocaleString("en-NG", {
                                style: "currency",
                                currency: "NGN"
                              })}
                            </strong>
                          </p>
                          <p>
                            <strong>Amount:</strong>{" "}
                            {parseFloat(
                              accounts.contributionAmount
                            ).toLocaleString("en-NG", {
                              style: "currency",
                              currency: "NGN"
                            })}
                          </p>
                          <p>
                            <strong>Frequency:</strong>{" "}
                            {accounts.contributionFrequency}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* New Loan Application */}
            <div
              className="modal fade"
              id="newLoanModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="newLoanModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="newLoanModalLabel">
                      New Loan Application
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
                    <form onSubmit={this.handleLoan}>
                      <div className="form-group">
                        <select
                          name="typeLoan"
                          className="form-control"
                          required
                          onChange={this.handleChange}
                        >
                          <option value="">Loan Type</option>
                          {this.state.loanType.map((loanType, index) => (
                            <option key={index} value={loanType.name}>
                              {loanType.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <select
                          name="loanAct"
                          className="form-control"
                          required
                          onChange={this.handleChange}
                        >
                          <option value="">Account</option>
                          {this.state.accounts.map((loanAct, index) => (
                            <option key={index} value={loanAct.accountNumber}>
                              {loanAct.accountNumber}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <input
                          type="number"
                          name="requestAmount"
                          className="form-control"
                          placeholder="Amount"
                          required
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="loanRefNo"
                          className="form-control"
                          placeholder="Application Number"
                          required
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="purpose"
                          minLength="25"
                          className="form-control"
                          placeholder="Purpose"
                          required
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <select
                          name="duration"
                          className="form-control"
                          required
                          onChange={this.handleChange}
                        >
                          <option value="">Duration</option>
                          <option value="1 month">1 Month</option>
                          <option value="2 months">2 Months</option>
                          <option value="3 months">3 Months</option>
                          <option value="4 months">4 Months</option>
                          <option value="5 months">5 Months</option>
                          <option value="6 months">6 Months</option>
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-success btn-block"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* New Transaction Modal Section */}
            <div
              className="modal fade"
              id="newTransactionModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="newTransactiontModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="newTransactionModalLabel">
                      New Transaction
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
                    {this.state.success2 === "done" ? (
                      <div className="alert alert-success">
                        {this.state.message2}
                      </div>
                    ) : this.state.success2 === "failed" ? (
                      <div className="alert alert-danger">
                        {this.state.error2}
                      </div>
                    ) : null}
                    <form onSubmit={this.handleTransaction}>
                      <div className="form-group">
                        <select
                          className="form-control"
                          name="accountNumber"
                          required
                          onChange={this.handleChange}
                        >
                          <option value="">Account Number</option>
                          {this.state.accounts.map((account, index) => (
                            <option key={index} value={account.accountNumber}>
                              {account.accountNumber}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <select
                          className="form-control"
                          name="transactionType"
                          required
                          onChange={this.handleChange}
                        >
                          <option value="">Transaction Type</option>
                          <option value="Debit">Withdrawal</option>
                          <option value="Credit">Deposit</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <input
                          type="amount"
                          className="form-control"
                          name="amount"
                          placeholder="Amount"
                          required
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="referenceNo"
                          placeholder="Transaction Reference"
                          required
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="description"
                          placeholder="Transaction Description"
                          required
                          onChange={this.handleChange}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-success btn-block"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Create Account Type Modal Section*/}
            <div
              className="modal fade"
              id="customerAccountModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="customerAccountModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="customerAccountModalLabel">
                      Add Customer Account
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
                    {this.state.success1 === "done" ? (
                      <div className="alert alert-success">
                        Customer Account Created
                      </div>
                    ) : this.state.success1 === "failed" ? (
                      <div className="alert alert-danger">
                        {this.state.error1}
                      </div>
                    ) : null}
                    <form onSubmit={this.createCustomerAccount}>
                      <div className="form-group">
                        <select
                          className="form-control"
                          name="actType"
                          required
                          onChange={this.handleChange}
                        >
                          <option value="">Account Type</option>
                          {this.state.accountType.length >= 1 ? (
                            this.state.accountType.map((accountType, index) => (
                              <option key={index} value={accountType.name}>
                                {accountType.name}
                              </option>
                            ))
                          ) : (
                            <option value="">Loading...</option>
                          )}
                        </select>
                      </div>
                      <div className="form-group">
                        <input
                          type="number"
                          className="form-control"
                          name="contributionAmount"
                          placeholder="Contribution Amount"
                          required
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <select
                          className="form-control"
                          name="contributionFrequency"
                          required
                          onChange={this.handleChange}
                        >
                          <option value="">Contribution Frequency</option>
                          <option value="Daily">Daily</option>
                          <option value="Weekly">Weekly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Yearly">Yearly</option>
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-success btn-block"
                      >
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
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}
