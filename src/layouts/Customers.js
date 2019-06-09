import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Customers extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       customers: [],
       authorised: true,
       firstName: '',
       lastName: '',
       email: '',
       phone: '',
       success: '',
       error: '',
    }
  }

  handleChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  createCustomer = e => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      phone,
    } = this.state;
    fetch(`http://localhost:3005/api/v1/staff/customer/create`, {
      method: "post",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
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
            success: "done"
          });
          window.location.href = `/customers/${res.data.newCustomer.id}`;
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
    fetch(`http://localhost:3005/api/v1/customer/`, {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("user"),
      }
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if(res.success){
        this.setState({
          customers: res.data.allCustomers,
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
        <h3>Customers</h3>
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search Customer"
              required
            />
          </div>
          <input
            type="submit"
            className="btn btn-primary btn-block"
            value="Search"
          />
        </form>
        <button
          type="button"
          data-toggle="modal"
          data-target="#createCustomerModal"
          className="btn btn-success btn-block my-2"
        >
          New Customer
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Other Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.customers.length >= 1 ? this.state.customers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.firstName}</td>
                <td>{customer.otherNames}</td>
                <td>{customer.lastName}</td>
                <td>{customer.phone}</td>
                <td><Link to={`/customers/${customer.id}`}>View</Link></td>
              </tr>
            )) : <tr>
              <td>No Customers Found</td>
            </tr>}
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
         {/* Create Staff Modal Section*/}
         <div
          className="modal fade"
          id="createCustomerModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="createCustomerModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="createCustomerModalLabel">
                  Create Customer
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
                  <div className="alert alert-success">Customer Created</div>
                ) : this.state.success === "failed" ? (
                  <div className="alert alert-danger">{this.state.error}</div>
                ) : null}
                <form onSubmit={this.createCustomer}>
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
