import React, { Component } from 'react'
import { withRouter, RouteComponentProps, RouteProps, Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { LOADING, NOT_ASKED } from '../../constants/index.js'
import { getCityForecastWeather, getForecastWeatherData, getStatusForecastWeather, getListForecastWeather } from '../../store/modules/forecastWeather/selector.js'
import Preloader from '../../components/Preloader/Preloader.jsx'
import { requestForecastWeather } from '../../store/modules/forecastWeather/index.js'

import './DetailedWeather.scss'

class DetailedWeather extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isViewGraph: true,
        }
    }


    componentDidUpdate(nextProps) {
        if (this.props.location.search !== nextProps.location.search) {
            this.getDataWeatherByIdCity()
        }
    }

    componentDidMount() {
        this.getDataWeatherByIdCity()
    }

    getDataWeatherByIdCity = () => {
        const { location } = this.props
        const query = queryString.parse(location.search)
        this.props.fetchWeatherData(query)
    }

    rendeListrForecastWeather = () => {
        const { listForecast } = this.props
        return (
            <div className="wrapper_list_forecast">
                {listForecast.map((item, index) => (
                    <div className="forecast_weather" key={index}>
                        <span className="date">Date and Time: {item.dt_txt}</span>
                        <div className="wrapper_data_weather">
                            <div className="cell_data">
                                <div className="title_field">Temperature</div>
                                <div className="data_field">{item.main.temp} °С</div>
                            </div>
                            <div className="cell_data">
                                <div className="title_field">Humidity</div>
                                <div className="data_field">{item.main.humidity}%</div>
                            </div>
                            <div className="cell_data">
                                <div className="title_field">Clouds</div>
                                <div className="data_field">{item.clouds.all}%</div>
                            </div>
                            <div className="cell_data">
                                <div className="title_field">Speed Wind</div>
                                <div className="data_field">{item.wind.speed}km/h</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    renderGraphForecastWeather = () => {
        const { listForecast } = this.props

        return (
            <div className="wrapper_graph">
                <div className="title_graph">Forecast Weather 5 days</div>
                <LineChart 
                    width={1000} 
                    height={300}
                    data={listForecast}
                    margin={{top: 25, right: 20, left: 20, bottom: 5}}
                >
                    <XAxis dataKey="dt_txt"/>
                    <YAxis/>
                    <CartesianGrid/>
                    <Tooltip/>
                    <Legend />
                    <Line type="monotone" dataKey='main.temp' name="Temperature" stroke="#8884d8" activeDot={{r: 8}} />
                    <Line type="monotone" dataKey="main.temp_max" name="The highest temperature"stroke="#82ca9d" />
                </LineChart>
            </div>
        )
    }

    handleViewMenu = () => this.setState({ isViewGraph: !this.state.isViewGraph })

    renderContent = () => {
        const { isViewGraph } = this.state
        return (
            <div className="wrapper_content">
                <div className="title_name">
                    <span className="city">{this.props.city.name}</span>
                    <span className="country_label">Country: </span>
                    <span className="country">{this.props.city.country}</span>
                    
                </div>
                <div className="button_menu" onClick={this.handleViewMenu}>
                    {isViewGraph ? 'Show List' : 'Show Graph'}
                </div>
                {this.state.isViewGraph && this.renderGraphForecastWeather() || this.rendeListrForecastWeather()}
            </div>
        )
    }

    render() {
        return (
            <div className="wrapper_info_weather bg">
                {this.props.statusDataWeather === LOADING && <Preloader /> || this.props.statusDataWeather !== NOT_ASKED && this.renderContent()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    city: getCityForecastWeather(state),
    statusDataWeather: getStatusForecastWeather(state),
    forecastWeather: getForecastWeatherData(state),
    listForecast: getListForecastWeather(state),
})

const mapDispatchToProps = (dispatch) => ({
    fetchWeatherData(data) {
        dispatch(requestForecastWeather({ data }))
    }
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailedWeather))