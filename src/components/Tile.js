import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Tile extends Component {
    render() {
        return (
            <div className="card m-1" style={{height: '8rem'}}>
                <div className="card-body p-auto">
                    <Link to={`${this.props.url}`}><h3 className="card-title">{this.props.title}</h3></Link>
                    <p className="card-description">{this.props.description}</p>
                </div>
            </div>
        )
    }
}
