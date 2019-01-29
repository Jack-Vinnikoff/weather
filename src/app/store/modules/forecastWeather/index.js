import { createAction, handleActions } from 'redux-actions'
import { put, takeLatest, select, throttle, call } from 'redux-saga/effects'
import { NOT_ASKED, FAILED, SUCCESSED, LOADING } from '../../../constants/index.js'
import { getForecastlWeather } from '../../../api/index.js'
import update from 'immutability-helper'
import { upgradeTemp } from '../../../common/index.js'

export const initialState = {
    forecastWeatherData: null,
    statusWeatherData: NOT_ASKED,
}

export const requestForecastWeather = createAction('REQUEST_FORECAST_WEATHER')
export const requestForecastWeatherDone = createAction('REQUEST_FORECAST_WEATHER_DONE', (data) => data)
export const requestForecastWeatherFailed = createAction('REQUEST_FORECAST_WEATHER_FAILED', (error) => error)

const reducer = handleActions({
    [requestForecastWeather]: (state) => ({
        ...state,
        statusWeatherData: LOADING,
    }),
    [requestForecastWeatherDone]: (state, action) => ({
        ...state,
        statusWeatherData: SUCCESSED,
        forecastWeatherData: adapterTransformKelvinForcelsius(action.payload),    
    }),
    [requestForecastWeatherFailed]: (state, error) => ({
        ...state,
        statusWeatherData: FAILED,
        forecastWeatherData: null,
    })
}, initialState)

export default reducer

function* fetchForecastWeather(action) {
    try {
        const { data } = action.payload
        const resp = yield call(getForecastlWeather, data)

        if (resp) {
            yield put(requestForecastWeatherDone(resp.data))
            console.log('resp ====', resp)
        } else {
            yield put(requestForecastWeatherFailed())
        }
    } catch (e) {
        console.log(`error request data weather ${ e.message }`)
    }
}

export function* forecastWeatherSaga() {
    yield takeLatest(requestForecastWeather, fetchForecastWeather)
}

const adapterTransformKelvinForcelsius = (dataWeather) => {
    const newDataWeather = { ...dataWeather, list: dataWeather.list.map((item) => {
        return update(item, {
            main: {
                temp: { $set: upgradeTemp(item.main.temp)},
                temp_min: { $set: upgradeTemp(item.main.temp_min)},
                temp_max: { $set: upgradeTemp(item.main.temp_max) }
            }
        })
    })}
   
    return newDataWeather
}