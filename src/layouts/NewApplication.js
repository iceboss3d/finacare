import React, { Component } from "react";
import queryString from "query-string";
import banks from "../helpers/banks";

export default class NewApplication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountNumber: "",
      loanTypeName: "",
      customerId: "",
      requestAmount: "",
      loanRefNo: "",
      purpose: "",
      duration: "",
      fullnameG1: "",
      addressG1: "",
      occupationG1: "",
      monthlyIncomeG1: "",
      placeOfworkG1: "",
      bvnG1: "",
      bankNameG1: "",
      bankAccountNumberG1: "",
      bankAcctTypeG1: "",
      employerNameG1: "",
      relationshipG1: "",
      phoneG1: "",
      fullname: "",
      address: "",
      occupation: "",
      monthlyIncome: "",
      placeOfwork: "",
      bvn: "",
      bankName: "",
      bankAccountNumber: "",
      bankAcctType: "",
      employerName: "",
      relationship: "",
      phone: "",
      success: '',
      error: []
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

  handleSubmit = e => {
    e.preventDefault();
    const {
      accountNumber,
      loanTypeName,
      customerId,
      requestAmount,
      loanRefNo,
      purpose,
      duration,
      fullnameG1,
      addressG1,
      occupationG1,
      monthlyIncomeG1,
      placeOfworkG1,
      bvnG1,
      bankNameG1,
      bankAccountNumberG1,
      bankAcctTypeG1,
      employerNameG1,
      relationshipG1,
      phoneG1,
      fullname,
      address,
      occupation,
      monthlyIncome,
      placeOfwork,
      bvn,
      bankName,
      bankAccountNumber,
      bankAcctType,
      employerName,
      relationship,
      phone
    } = this.state;
    const data = {
      requestAmount,
      loanRefNo,
      loanTypeName,
      purpose,
      duration,
      gaurantorsArray: [
        {
          fullname,
          address,
          occupation,
          monthlyIncome,
          placeOfwork,
          bvn,
          bankName,
          bankAccountNumber,
          bankAcctType,
          employerName,
          relationship,
          phone
        },
        {
          fullname: fullnameG1,
          address: addressG1,
          occupation: occupationG1,
          monthlyIncome: monthlyIncomeG1,
          placeOfwork: placeOfworkG1,
          bvn: bvnG1,
          bankName: bankNameG1,
          bankAccountNumber: bankAccountNumberG1,
          bankAcctType: bankAcctTypeG1,
          employerName: employerNameG1,
          relationship: relationshipG1,
          phone: phoneG1
        }
      ]
    };
    console.log(data);
    fetch(
      `http://localhost:3005/api/v1/loan/create/${customerId}/${accountNumber}`,
      {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "access-token": localStorage.getItem("user")
        }
      }
    )
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.success) {
          this.setState({
            success: "done"
          });
        } else {
          this.setState({ success: "failed", error: res.errors });
        }
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    this.setState({
      accountNumber: values.accountNumber,
      loanTypeName: values.loanTypeName,
      customerId: values.customerId,
      requestAmount: values.requestAmount,
      loanRefNo: values.loanRefNo,
      purpose: values.purpose,
      duration: values.duration
    });
  }

  render() {
    return (
      <div className="container mt-4 mb-4">
        <h3>New Loan Application</h3>
        {this.state.success === 'failed' ? (
          <div className="alert alert-danger">
            <ul>
              {this.state.error.map((error, index) => (
                <li key={index}>{error.message}</li>
              ))}
            </ul>
          </div>
        ) : this.state.success === 'done' ? <div className="alert alert-success">Application Sent Succesfully</div> : null}
        <form onSubmit={this.handleSubmit}>
          <h4>First Guarantor</h4>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="fullname"
              placeholder="Full Name"
              required
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="address"
              placeholder="Residential Address"
              required
              onChange={this.handleChange}
            />
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="occupation"
                  placeholder="Occupation"
                  required
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <input
                  type="number"
                  className="form-control"
                  name="monthlyIncome"
                  placeholder="Net Monthly Income"
                  required
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="placeOfwork"
                  placeholder="Place of Work"
                  required
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="bvn"
                  maxLength="10"
                  minLength="10"
                  placeholder="Bank Verification Number"
                  required
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <select
                  className="form-control"
                  name="bankName"
                  required
                  onChange={this.handleChange}
                >
                  <option value="">Bank Name</option>
                  {banks.map((bank, index) => (
                    <option key={index} value={bank.name}>
                      {bank.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <input
                  type="number"
                  className="form-control"
                  name="bankAccountNumber"
                  maxLength="10"
                  minLength="10"
                  placeholder="Bank Account Number"
                  required
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="bankAcctType"
                  placeholder="Bank Account Type"
                  required
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="employerName"
                  placeholder="Name of Employer"
                  required
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="relationship"
                  placeholder="Relationship"
                  required
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  maxLength="11"
                  minLength="11"
                  placeholder="Phone Number"
                  required
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <hr />
          <h4>Second Guarantor</h4>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="fullnameG1"
              placeholder="Full Name"
              required
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="addressG1"
              placeholder="Residential Address"
              required
              onChange={this.handleChange}
            />
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="occupationG1"
                  placeholder="Occupation"
                  required
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <input
                  type="number"
                  className="form-control"
                  name="monthlyIncomeG1"
                  placeholder="Net Monthly Income"
                  required
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="placeOfworkG1"
                  placeholder="Place of Work"
                  required
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="bvnG1"
                  maxLength="10"
                  minLength="10"
                  placeholder="Bank Verification Number"
                  required
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <select
                  className="form-control"
                  name="bankNameG1"
                  required
                  onChange={this.handleChange}
                >
                  <option value="">Bank Name</option>
                  {banks.map((bank, index) => (
                    <option key={index} value={bank.name}>
                      {bank.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <input
                  type="number"
                  className="form-control"
                  name="bankAccountNumberG1"
                  maxLength="10"
                  minLength="10"
                  placeholder="Bank Account Number"
                  required
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="bankAcctTypeG1"
                  placeholder="Bank Account Type"
                  required
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="employerNameG1"
                  placeholder="Name of Employer"
                  required
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="relationshipG1"
                  placeholder="Relationship"
                  required
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <input
                  type="tel"
                  className="form-control"
                  name="phoneG1"
                  maxLength="11"
                  minLength="11"
                  placeholder="Phone Number"
                  required
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-success btn-block">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
