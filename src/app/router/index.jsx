import React, { Component } from 'react'
import { Route, Switch, withRouter, RouteComponentProps, RouteProps, BrowserRouter } from 'react-router-dom'
import Header from '../containers/Header/Header.jsx'
import HomePage from '../containers/Home/Home.jsx'
import ListCityies from '../containers/Cityies/Cityies.jsx'
import WrapperWeather from '../containers/DetailedWeather/WrapperWeather.jsx'

class Routes extends Component {
    render(){
        return(
            <div className="site_wrapper">
                <Header />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/cityies" component={ListCityies} />
                    <Route path="/forecast" component={WrapperWeather} />
                </Switch>
            </div>
        )
    }
}

export default withRouter(Routes)