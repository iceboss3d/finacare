import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "../layouts/Login";
import Home from "../layouts/Home";
import Customers from "../layouts/Customers";
import Loans from "../layouts/Loans";
import Transactions from "../layouts/Transactions";
import AccountSettings from "../layouts/AccountSettings";
import Nav from "../layouts/Nav";
import Logout from "./Logout";
import StaffSettings from "../layouts/StaffSettings";
import jwt from "jsonwebtoken";
import LoanSettings from "../layouts/LoanSettings";
import Profile from "../layouts/Profile";
import Customer from "../layouts/Customer";
import NewApplication from "../layouts/NewApplication";
import Loan from "../layouts/Loan";

function AuthenticatedRoute({component: Component, authenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
      ? <Component {...props} {...rest} />
      : <Redirect to={{pathname: "/login", state: {from: props.location}}} /> } />
  )
}

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      currentUser: ""
    };
  }

  componentWillMount() {
    this.checkAuthentication();
  }

  checkAuthentication = () => {
    if (localStorage.hasOwnProperty("user")) {
      const user = localStorage.getItem("user");
      const currentUser = jwt.decode(user);
      this.setState({
        authenticated: true,
        currentUser: currentUser,
      });
    } else {
      this.setState({
        authenticated: false,
        currentUser: null,
      })
    }
  };

  setCurrentUser = (user) => {
    if(user){
      this.setState({
        currentUser: user,
        authenticated: true,
      })
      console.log(user);
    } else {
      this.setState({
        currentUser: null,
        authenticated: false,
      })
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Nav authenticated={this.state.authenticated} user={this.state.currentUser} />
          <Route exact={true} path='/login' render={(props) => (
            <div className="App">
              <Login setCurrentUser={this.setCurrentUser} {...props} authenticated={this.state.authenticated}/>
            </div>
          )}/>
          <Route exact path='/logout' component={Logout}/>
          <AuthenticatedRoute
            path="/"
            exact
            authenticated={this.state.authenticated}
            component={Home}
          />
          <AuthenticatedRoute
            path="/customers"
            authenticated={this.state.authenticated}
            exact
            component={Customers}
          />
          <AuthenticatedRoute
            path="/settings/accounts"
            authenticated={this.state.authenticated}
            exact
            component={AccountSettings}
          />
          <AuthenticatedRoute
            path="/settings/loans"
            authenticated={this.state.authenticated}
            exact
            component={LoanSettings}
          />
          <AuthenticatedRoute
            path="/loans"
            authenticated={this.state.authenticated}
            exact
            component={Loans}
          />
          <AuthenticatedRoute
            path="/loans/:id"
            authenticated={this.state.authenticated}
            exact
            component={Loan}
          />
          <AuthenticatedRoute
            path="/loans/new-application"
            authenticated={this.state.authenticated}
            exact
            component={NewApplication}
          />
          <AuthenticatedRoute
            path="/profile"
            authenticated={this.state.authenticated}
            exact
            component={Profile}
          />
           <AuthenticatedRoute
            path="/customers/:id"
            authenticated={this.state.authenticated}
            exact
            component={Customer}
          />
          <AuthenticatedRoute
            path="/transactions"
            authenticated={this.state.authenticated}
            exact
            component={Transactions}
          />
          <AuthenticatedRoute
            path="/settings/staff"
            authenticated={this.state.authenticated}
            exact
            component={StaffSettings}
          />
        </div>
      </Router>
    );
  }
}
