import { createAction, handleActions } from 'redux-actions'
import update from 'immutability-helper'
import { put, takeLatest, select, throttle, call } from 'redux-saga/effects'
import { getCityName } from '../../../api/index.js'
import { NOT_ASKED, FAILED, SUCCESSED, LOADING } from '../../../constants/index.js'
import { upgradeTemp } from '../../../common/index.js'

export const initialState = {
    cityData: null,
    statusCityData: NOT_ASKED,
    listCityies: [],
    currentCity: null,
}

export const requestCity = createAction('REQUEST_CITY')
export const requestCityDone = createAction('REQUEST_CITY_DONE')
export const requestCityFailed = createAction('REQUEST_CITY_FAILED')
export const clearCityData = createAction('CLEAR_CITY_DATA')
export const addCity = createAction('ADD_CITY', (data) => data)
export const removeCity = createAction('REMOVE_CITY', (data) => data)
export const removeAllCityies = createAction('REMOVE_ALL_CITYIES')
export const setCurrentCity = createAction('SET_CURRENT_CITY', (data) => data)

const reducer = handleActions({
    [requestCity]: (state) =>({
        ...state,
        statusCityData: LOADING,
    }),
    [requestCityDone]: (state, action) => ({
        ...state,
        statusCityData: SUCCESSED,
        cityData: adapterTransformKelvinForcelsius(action.payload),
    }),
    [requestCityFailed]: (state) =>({
        ...state,
        statusCityData: FAILED,
        cityData: null,
    }),
    [clearCityData]: (state) => ({
        ...state,
        statusCityData: NOT_ASKED,
        cityData: null,
    }),
    [addCity]: (state, action) => ({
        ...state,
        listCityies: action.payload,
    }),
    [removeCity]: (state, action) => ({
        ...state,
        listCityies: action.payload,
    }),
    [removeAllCityies]: (state) => ({
        ...state,
        listCityies: [],
    }),
    [setCurrentCity]: (state, action) => ({
        ...state,
        currentCity: action.payload,
    })
}, initialState)

export default reducer

function* fetchCity(action) {
    try {
        const { cityName } = action.payload
        const resp = yield call(getCityName, cityName)

        if(resp) {
            yield put(requestCityDone(resp.data))
        } else {
            yield put(requestCityFailed())
        }

    } catch(e) {
        console.log(`error request ${ e.message }`)
    }
}

export function* citiesSaga() {
    yield takeLatest(requestCity, fetchCity)
}

const adapterTransformKelvinForcelsius = (city) => {
     return update(city, {
         main: {
            temp: { $set: upgradeTemp(city.main.temp) },
            temp_min: { $set: upgradeTemp(city.main.temp_min)},
            temp_max: { $set: upgradeTemp(city.main.temp_max) } 
         }
     })
}
