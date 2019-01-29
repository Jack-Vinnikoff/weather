import React, { Component } from 'react'
import { withRouter, RouteComponentProps, RouteProps, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Fade } from 'react-reveal'
import cn from 'classnames'
import { requestCity, setCurrentCity } from '../../store/modules/city/index.js'
import { getCurrentCity, getListCityies, getCityData, getCityWeather } from '../../store/modules/city/selector.js'

import './Home.scss'

class HomePage extends Component {
    constructor(){
        super()

        this.state = {
            widgitCityies: false,
            widgitWeather: false,
        }
    }

    componentDidMount() {
        const { currentCIty } = this.props
        if (this.props.currentCIty) {
            const { currentCIty } = this.props
            this.props.getCityWeather(currentCIty.name)
        }
    }

    toggleWidgit = (nameWidgit) => {
        this.setState({ [nameWidgit]: !this.state[nameWidgit] })
    }

    selectedCity = (item) => {
        this.props.setCurrentCity(item)
        this.props.getCityWeather(item.name)
    }

    renderCity = () => {
        const { currentCIty } = this.props
        return (
            <div>
                {this.props.listCityies.map((item, index) => (
                    <div
                        key={index} 
                        className={cn('item_city', { active: currentCIty.id === item.id })}
                        onClick={() => this.selectedCity(item)}    
                    >
                        {item.name}
                    </div>
                ))}
            </div>
        )
    }

    renderWidgitCityies = () => {
        return (
            <Fade right>
                <div className="wr_widgit_cityies">
                    <div className="bg widgit_cityies">
                        <div className="header_block">List Cityies</div>
                        {this.props.listCityies.length && this.renderCity() || (
                            <span>No city was added</span>    
                        )}
                    </div>
                </div>
            </Fade>
        )
    }

    renderContentWeather = () => {
        const { city, weather } = this.props
        return (
            <Fade bottom>
                <div className="wr_weather_content bg">
                    {this.props.currentCIty && (
                        <div className="weather_content">
                            <div className="image">
                                <img src={require('../../assets/mediumIcons/01d.png')}/>
                            </div>
                            <div className="city_name">
                                <h1>{city.name}</h1>
                                <span>{weather.description}</span>
                                <div className="temp">
                                    {city.main.temp} °С
                                </div>
                                <span>temperature from {city.main.temp_max} to {city.main.temp_min} °С, wind {city.wind.speed} m/s. clouds {city.clouds.all}%</span>
                            </div>
                        </div>
                    ) || (
                        <div className="warn">No city was selected</div>
                    )}
                </div>
            </Fade>
        )
    }

    renderWidgitWeather = () => {
        return (
            <div className="block_weather_city">
                <div className="wrapper_btn_widgit">
                    <button
                        className="bg"
                        onClick={() => this.toggleWidgit('widgitWeather')}
                    >
                        {this.state.widgitWeather ? 'Close' : 'Open'}
                    </button>
                </div>
                {this.state.widgitWeather && this.renderContentWeather()}
            </div>
        )
    }

    render() {
        return (
            <div className="wrapper_home">
                <div className="main_block">
                    <div className="text_home_page">
                        <Fade left delay={300}><h1>Welcome to</h1></Fade>
                        <Fade left delay={550}><div>Weather App</div></Fade>
                        <Fade left delay={750}><span>Click please here <Link to="/cityies" className="link">List Cityes</Link> or <Link to="/forecast" className="link">Forecast weather</Link></span></Fade>
                    </div>
                    <div style={{ display: 'inline-flex' }}>
                        <button
                            className="btn_show_widgit bg" 
                            onClick={() => this.toggleWidgit('widgitCityies')}
                        >
                            {this.state.widgitCityies ? '>' : '<'}
                        </button>
                        {this.state.widgitCityies && this.renderWidgitCityies()}
                    </div>
                </div>
                {this.renderWidgitWeather()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    city: getCityData(state),
    listCityies: getListCityies(state),
    currentCIty: getCurrentCity(state),
    weather: getCityWeather(state),
})

const mapDispatchToProps = (dispatch) => ({
    getCityWeather(cityName) {
        dispatch(requestCity({ cityName }))
    },
    setCurrentCity(data) {
        dispatch(setCurrentCity(data))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage)