import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class Loans extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       loans: [],
    }
  }

  componentDidMount() {
    fetch(`http://localhost:3005/api/v1/loan/`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('user'),
      }
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      this.setState({
        loans: res.data.allLoans,
      });
    })
    .catch(err => console.log(err));
  }
  
  render() {
    return (
      <div className="container mt-4">
        <h3>Loans</h3>
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search Loan by Application Number"
              required
            />
          </div>
          <input
            type="submit"
            className="btn btn-primary btn-block"
            value="Search Loan"
          />
        </form>
        <table className="table">
          <thead>
            <tr>
              <th>App. No.</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Amount</th>
              <th>Loan Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.loans.length >= 1?
            this.state.loans.map((loan, index) => (
              <tr key={index}>
                <td>{loan.loanRefNo}</td>
                <td>{loan.Customer.firstName}</td>
                <td>{loan.Customer.lastName}</td>
                <td>{loan.requestAmount}</td>
                <td>{loan.LoanType.name}</td>
                <td>{loan.approvalStatus}</td>
                <td><Link to={`/loans/${loan.id}`}>View</Link></td>
            </tr>
            )) : <tr><td>No Loans Found</td></tr>}
          </tbody>
        </table>
        <nav aria-label="...">
          <ul className="pagination">
            <li className="page-item disabled">
              <span className="page-link">Previous</span>
            </li>
            <li className="page-item">
              <a className="page-link" href="#1">
                1
              </a>
            </li>
            <li className="page-item active">
              <span className="page-link">
                2<span className="sr-only">(current)</span>
              </span>
            </li>
            <li className="page-item">
              <a className="page-link" href="#3">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#next">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
