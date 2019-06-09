import React, { Component } from "react";

export default class Transactions extends Component {
  render() {
    return (
      <div className="container mt-4">
        <h3>Transactions</h3>
        <div className="row mx-auto">
        <div className="col-md-5 m-1">
            <div className="card">
              <div className="card-header">
                <h4>New Transaction</h4>
              </div>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <input type="number" className="form-control" name="accountNumber" placeholder="Account Number" required/>
                  </div>
                  <div className="form-group">
                    <select className="form-control" name="transactionType">
                      <option value="">Transaction Type</option>
                      <option value="Debit">Withdrawal</option>
                      <option value="Credit">Deposit</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <input type="number" className="form-control" name="amount" placeholder="Amount" required/>
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" name="transactionRef" placeholder="Transaction Reference" required/>
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" name="description" placeholder="Description" required/>
                  </div>
                  <input type="button" className="btn btn-primary btn-block" value="Submit"/>
                </form>
                <div>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5 m-1">
            <div className="card">
              <div className="card-header">
                <h4>Search Transaction</h4>
              </div>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <input type="number" className="form-control" name="accountNumber" placeholder="Account Number" required/>
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" name="transactionRef" placeholder="Transaction Reference" required/>
                  </div>
                  <input type="button" className="btn btn-primary btn-block" value="Search"/>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
