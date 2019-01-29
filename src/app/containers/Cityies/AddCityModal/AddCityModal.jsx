import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCityData, getStatusCityData, getCityWeather, getListCityies } from '../../../store/modules/city/selector.js'
import { requestCity, clearCityData, addCity, setCurrentCity } from '../../../store/modules/city/index.js'
import { LOADING, FAILED } from '../../../constants/index.js'
import { checkHasIcons } from '../../../common/index.js'
import Preloader from '../../../components/Preloader/Preloader.jsx'

import './AddCityModal.scss'

class AddCityModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nameCity: '',
        }
    }

    componentWillUnmount(){
        this.props.clearCItyData()
    }

    handleInputAddCity = (e) => {
        if(!parseInt(e.target.value)){
            this.setState({ nameCity: e.target.value })
        }
        return false
    }

    getCity = () => {
        this.props.getCity(this.state.nameCity)
        this.setState({ nameCity: '' })
    }

    renderContent = () => {
        const { city, weather } = this.props
        return (
            <React.Fragment>
                {this.props.city && (
                    <React.Fragment>
                        <div className="item_city">
                            <div className="icon">
                                <img src={checkHasIcons('smallIcons', weather.icon)} />
                            </div>
                            <div className="info_panel">
                                <span className="title_city">{city.name}</span>
                                <span className="descr_weather">{weather.description}</span>
                                <div className="temp">
                                    {city.main.temp} ℃
                                </div>
                            </div>
                        </div>
                        <div className="more_info">
                            <span>temperature from {city.main.temp_max} to {city.main.temp_min} °С, wind {city.wind.speed} m/s. clouds {city.clouds.all}%</span>
                        </div>
                    </React.Fragment>
                ) || (
                    <div className="warn">
                        Please enter the city
                    </div>
                )}
            </React.Fragment>
        )
    }

    addCity = () => {
        const { city, listCityies } = this.props

        if (city) {
            const newListCityies = [ ...listCityies, city ]
            this.props.addCityInList(newListCityies)
            this.props.setCurrentCity({ ...city })
            this.props.clearCItyData()
        }
    }

    render(){
        return (
            <div className="wr_add_city">
                <div className="wr_input_add_city">
                    <input 
                        type="text"
                        value={this.state.nameCity}
                        onChange={this.handleInputAddCity}
                        placeholder="Please enter the city"
                    />
                    <button
                        onClick={this.getCity}
                        disabled={!this.state.nameCity.length}
                    >Find City</button>
                </div>
                <div className="wr_item_city">
                    {this.props.statusData === LOADING && <Preloader />}
                    {this.props.statusData !== FAILED && this.renderContent() || (
                        <div className="warn">
                            Sorry, city ​​not found try to enter another name
                        </div>
                    )}
                </div>
                <div className="footer_modal">
                    <div className="btn" onClick={this.addCity}>Add City</div>
                    <div className="btn" onClick={this.props.closeModal}>Cancel</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    city: getCityData(state),
    statusData: getStatusCityData(state),
    weather: getCityWeather(state),
    listCityies: getListCityies(state),
})
const mapDispatchToProps = (dispatch) =>({
    getCity(cityName) {
        dispatch(requestCity({ cityName }))
    },
    clearCItyData() {
        dispatch(clearCityData())
    },
    addCityInList(data) {
        dispatch(addCity(data))
    },
    setCurrentCity(data) {
        dispatch(setCurrentCity(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCityModal)