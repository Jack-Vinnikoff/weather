import React, { Component } from 'react'
import Routes from './router/index.jsx'
import './styles/style.scss'

export default class App extends Component {
    render(){
        return (
            <div>
                <Routes />
            </div>
        )
    }
}