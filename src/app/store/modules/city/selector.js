export const getCityData = (state) => state.city.cityData
export const getStatusCityData = (state) => state.city.statusCityData
export const getListCityies = (state) => state.city.listCityies
export const getCurrentCity = (state) => state.city.currentCity
export const getCityWeather = (state) => {
    const cityData = getCityData(state)

    return cityData ? cityData.weather[0] : null
}