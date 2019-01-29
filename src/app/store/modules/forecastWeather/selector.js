export const getForecastWeatherData = (state) => state.forecastWeather.forecastWeatherData
export const getStatusForecastWeather = (state) => state.forecastWeather.statusWeatherData
export const getCityForecastWeather = (state) => {
    const forecast = getForecastWeatherData(state)

    return forecast ? forecast.city : null
}

export const getListForecastWeather = (state) => {
    const forecast = getForecastWeatherData(state)

    return forecast ? forecast.list : null
}