import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'
import rootReducer from './reducers'
import setupEpic from './epics'

let store = null
const epicMiddleware = createEpicMiddleware()
if (process.env.NODE_ENV === 'development') {
    store = createStore(rootReducer, applyMiddleware(thunk, epicMiddleware, createLogger()))
    epicMiddleware.run(setupEpic)
} else {
    store = createStore(rootReducer, applyMiddleware(thunk, epicMiddleware))
    epicMiddleware.run(setupEpic)
}

export default store
