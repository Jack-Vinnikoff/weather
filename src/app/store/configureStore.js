import { applyMiddleware, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware, { END } from 'redux-saga'
import rootReducer, { rootSaga } from './modules/index.js'
import { apiMiddleware } from '../api/index.js'
import * as city from './modules/city/index.js'
import * as forecastWeather from './modules/forecastWeather/index.js'

const sagaMiddleware = createSagaMiddleware()

function transformState(initialState){
    if(initialState) {
        return {
            city: {
                ...city.initialState,
                ...initialState.city,
            },
            forecastWeather: {
                ...forecastWeather.initialState,
                ...initialState.forecastWeather,
            }
        }
        
    } else {
        return {
            city: {
                ...city.initialState,
            },
            forecastWeather: {
                ...forecastWeather.initialState,
            }  
        }
    }
}

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        transformState(initialState),
        composeWithDevTools(applyMiddleware(sagaMiddleware, apiMiddleware))
    )
    
    sagaMiddleware.run(rootSaga, store.dispatch)
    store.close = () => store.dispatch(END)

    if (module.hot) {
        module.hot.accept('./modules', () => {
          const newReducer = require('./modules/index.js').default
          store.replaceReducer(newReducer)
        })
      }

    return store
}