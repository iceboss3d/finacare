import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

export default class Logout extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       redirect: false,
    }
  }

  componentWillMount() {
    localStorage.removeItem('user');
    this.setState({
      redirect: true,
    })
  }
  
  render() {
    if(this.state.redirect) {
      return <Redirect to="/login"/>
    }
    return (
      <div>
        <h3>Logging Out...</h3>
      </div>
    )
  }
}
