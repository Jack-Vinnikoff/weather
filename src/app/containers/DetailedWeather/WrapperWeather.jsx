import React, { Component } from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'
import { withRouter, RouteComponentProps, RouteProps, Link, Route, Switch } from 'react-router-dom'
import { getListCityies, getCurrentCity } from '../../store/modules/city/selector'
import { setCurrentCity } from '../../store/modules/city/index.js'
import DetailedWeather from './DetailedWeather.jsx'

import './WrapperWeather.scss'

class Wrapper extends Component {
    constructor(props) {
        super (props)

        this.state = {
            filterCity: '',
        }
    }


    componentDidMount() {
        if (this.props.currentCity) {
            this.goTotSelectedCity()
        }
        this.setState({ listCityies: this.props.listCityies })
    }

    goTotSelectedCity = () => {
        const { currentCity, location, history } = this.props
        history.push({
            pathname: `${location.pathname}/city`,
            search: `?id=${currentCity.id}&days=5`
        })
    }

    filterHandler = (event) => {
        this.setState({ filterCity: event.target.value })
    }

    renderBlockError = () => (
        <React.Fragment>
            <h3>no city added</h3>
            <span>Click please here <Link to='/cityies'>List cityies</Link></span>    
        </React.Fragment>
    )
    
    renderMenu = () => {
        const { listCityies, currentCity } = this.props
        const { filterCity } = this.state
        const filter = listCityies.filter((city)=>{
            return city.name.toLowerCase().indexOf(filterCity.toLowerCase()) !== -1
        })
        return (
            <React.Fragment>
                {filter.map((city, index) => (
                    <Link
                        key={index} 
                        to={{
                            pathname: `/detalinfo/city`,
                            search: `?id=${city.id}&days=5`
                        }}
                        onClick={() => this.props.setCurrentCity(city)}
                        className={cn('button', {'active_button': city.id === currentCity.id})}    
                    >
                        {city.name}
                    </Link>
                ))}
            </React.Fragment>
        )
    }
    render() {
        return (
            <div className="wrapper_detal_weather_menu">
                <div className="menu_column bg">
                    <div className="fillter_city">
                        <input 
                            type="text"
                            value={this.state.filterCity}
                            placeholder="Enter name city please"
                            onChange={this.filterHandler}     
                        />
                    </div>
                    {this.props.listCityies.length && this.renderMenu() || this.renderBlockError()}
                </div>
                <div className="wrapper_detailed_weather">
                    <Route path="/:detal/city" component={DetailedWeather}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    listCityies: getListCityies(state),
    currentCity: getCurrentCity(state),
})

const mapDispatchToProps = (dispatch) => ({
    setCurrentCity(data) {
        dispatch(setCurrentCity(data))
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Wrapper))