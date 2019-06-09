import React, { Component } from "react";
import Tile from "../components/Tile";

export default class Home extends Component {
  render() {
    return (
      <div className="container mt-4">
        <h3>Dashboard</h3>
        <form className="m-1">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Search Customer" required/>
          </div>
          <input type="submit" className="btn btn-primary btn-block" value="Search"/>
        </form>
        <div className="row">
          <div className="col-md-4">
            <Tile title={'Customers'} icon={"users"} url={"/customers"} description={"Create and View Customers"} />
          </div>
          <div className="col-md-4">
            <Tile title={'Transactions'} icon={"users"} url={"/transactions"} description={"Create New Transactions"} />
          </div>
          <div className="col-md-4">
            <Tile title={'Loans'} icon={"users"} url={"/loans"} description={"Create and View Loan Applications"} />
          </div>
           <div className="col-md-4">
            <Tile title={'My Profile'} icon={"users"} url={"/profile"} description={"View and Edit your Profile"} />
          </div>
        </div>
      </div>
    );
  }
}
