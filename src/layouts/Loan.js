import React, { Component } from "react";

export default class Loan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
      loan: "",
      success: "",
      error: "",
      approvedAmount: "",
      loading: true,
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3005/api/v1/loan/${this.state.id}`, {
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
        loan: res.data.loan,
        loading: false,
      })
    })
    .catch(err => console.log(err));
  }

  render() {
    const {loan, loading} = this.state;
    if(loading) {
      return (
        <div className="container mt-4">
          <center>
            <p className="lead">Loading...</p>
          </center>
        </div>
      )
    }
    return (
      <div className="container mt-4 mb-4">
        <h3>{loan.Customer.firstName} {loan.Customer.otherNames} {loan.Customer.lastName}</h3>
      </div>
    );
  }
}
