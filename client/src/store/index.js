import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';

const middleware = [
    thunk
]
const withDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, withDevTools(
    applyMiddleware(...middleware)
))

export default store;