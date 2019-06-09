import React, { Component } from "react";
import jwt from 'jsonwebtoken';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       email: '',
       password: '',
       error: "",
       redirect: false,
    }
  }
  componentWillMount(){
    if(this.props.authenticated) {
      this.setState({
        redirect: true,
      })
    }
  }


  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      error: "",
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3005/api/v1/auth`, {
      method: 'post',
      body: JSON.stringify({
        emailOrStaffId: this.state.email,
        password: this.state.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then((res) => {
      if(res.success) {
        const user = jwt.decode(res.data.token);
        localStorage.setItem('user', res.data.token);
        this.props.setCurrentUser(user);
        this.setState({
          redirect: true,
        });
      }
      else {
        console.log(res);
        const errors = res.errors[0].message;
        this.setState({
          error: errors,
        });
      }
    })
    .catch(err => console.log(err));
  }
  
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/'}}
    if(this.state.redirect) {
      return (
        <Redirect to={from}/>
      )
    }
    return (
      <div className="login-body text-center">
        <form className="form-signin" onSubmit={this.handleSubmit}>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in {this.state.authenticated ? <small>{this.state.authenticated}</small> : <small>{this.state.authenticated}</small>}</h1>
          {
            this.state.error !== "" ? <div className="alert alert-danger">{this.state.error}</div> : null
          }
          <label htmlFor="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="inputEmail"
            name="email"
            className="form-control"
            placeholder="Email address"
            required
            autoFocus
            onChange={this.handleChange}
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="inputPassword"
            name="password"
            className="form-control"
            placeholder="Password"
            required
            onChange={this.handleChange}
          />
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign in
          </button>
        </form>
      </div>
    );
  }
}
