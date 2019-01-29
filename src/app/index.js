import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import { Router, hashHistory } from 'react-router-dom'
import { rootSaga } from './store/modules/index.js'
import configureStore from './store/configureStore.js'
import App from './app.jsx';

const history = createBrowserHistory()
const store = configureStore(window.__INITIAL_STATE__)

const render = (Component) => {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <Component />
            </Router>
        </Provider>,
        document.getElementById('app'),
    );
}

render(App);

module.hot.accept();