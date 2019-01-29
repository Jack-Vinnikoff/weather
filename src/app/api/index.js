import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'


export const apiMiddleware = reduxStore => next => action => next(action)

export const getCityName = (param) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${param}&APPID=c424be481b8c33aa584ad4795c515bd0`)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            console.log(error);
    });
}

export const getForecastlWeather = ({ id, days }) => { 
    return axios.get(`https://api.openweathermap.org/data/2.5/forecast?id=${+id}&APPID=c424be481b8c33aa584ad4795c515bd0`)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            console.log(error);
    });
}