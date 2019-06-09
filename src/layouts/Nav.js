import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Nav extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <NavLink className="navbar-brand" to="/">
            FinCare Plus
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            {this.props.authenticated ? (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink
                    exact
                    activeClassName="active"
                    className="nav-link"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    activeClassName="active"
                    className="nav-link"
                    to="/customers"
                  >
                    Customers
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    activeClassName="active"
                    className="nav-link"
                    to="/transactions"
                  >
                    Transactions
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    activeClassName="active"
                    className="nav-link"
                    to="/loans"
                  >
                    Loans
                  </NavLink>
                </li>
                {this.props.user.level === "Admin" ||
                this.props.user.level === "SuperAdmin" ? (
                  <React.Fragment>
                    <li className="nav-item dropdown">
                      <NavLink
                        className="nav-link dropdown-toggle"
                        to="/reports"
                        id="reports"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Reports
                      </NavLink>
                      <div className="dropdown-menu" aria-labelledby="reports">
                        <NavLink
                          exact
                          activeClassName="active"
                          className="dropdown-item"
                          to="/reports/income-statement"
                        >
                          Income Statement
                        </NavLink>
                        <NavLink
                          exact
                          activeClassName="active"
                          className="dropdown-item"
                          to="/report/balance-sheet"
                        >
                          Balance Sheet
                        </NavLink>
                      </div>
                    </li>
                    {this.props.user.level === "SuperAdmin" ? (
                      <li className="nav-item dropdown">
                        <NavLink
                          className="nav-link dropdown-toggle"
                          to="/settings"
                          id="settings"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Settings
                        </NavLink>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="settings"
                        >
                          <NavLink
                            exact
                            activeClassName="active"
                            className="dropdown-item"
                            to="/settings/accounts"
                          >
                            Accounts
                          </NavLink>
                          <NavLink
                            exact
                            activeClassName="active"
                            className="dropdown-item"
                            to="/settings/loans"
                          >
                            Loans
                          </NavLink>
                          <NavLink
                            exact
                            activeClassName="active"
                            className="dropdown-item"
                            to="/settings/staff"
                          >
                            Staff
                          </NavLink>
                        </div>
                      </li>
                    ) : null}
                  </React.Fragment>
                ) : null}
              </ul>
            ) : null}
            <div className="ml-auto">
              <ul className="navbar-nav">
                {this.props.authenticated ? (
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      to="/profile"
                      id="profile"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {this.props.user.fullname}
                    </NavLink>
                    <div className="dropdown-menu" aria-labelledby="profile">
                      <NavLink
                        exact
                        activeClassName="active"
                        className="dropdown-item"
                        to="/profile"
                      >
                        Profile
                      </NavLink>
                      <NavLink
                        exact
                        activeClassName="active"
                        className="dropdown-item"
                        to="/logout"
                      >
                        Logout
                      </NavLink>
                    </div>
                  </li>
                ) : (
                  <li className="nav-item">
                    <NavLink
                      exact
                      activeClassName="active"
                      className="nav-link"
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
