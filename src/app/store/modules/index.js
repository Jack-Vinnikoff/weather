import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'
import forecastWeather, { forecastWeatherSaga } from './forecastWeather/index.js'
import { citiesSaga } from './city/index.js'
import city from './city/index.js'

const appReducer = combineReducers({
    forecastWeather,
    city,
})

const rootReducer = (state, action) => appReducer(state, action)

export default rootReducer

export function*  rootSaga() {
    yield all([
        citiesSaga(),
        forecastWeatherSaga()
    ])
}