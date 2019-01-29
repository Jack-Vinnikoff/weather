import React, { Component } from 'react'

import './Preloader.scss'

export default class Preloader extends Component {
    render() {
        return (
            <div className="preloader-wrap">
                <div className="preloader clearfix">
                <div className="point-1-animation" />
                <div className="point-2-animation" />
                <div className="point-3-animation" />
                <div className="point-4-animation" />
                <div className="point-5-animation" />
                <div className="point-6-animation" />
                </div>
            </div>
        )
    }
}