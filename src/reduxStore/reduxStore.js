import {applyMiddleware, combineReducers, createStore} from 'redux';
import appReducer from "./appReducer";

const reducers = combineReducers({
    app: appReducer,
})

const store = createStore(reducers, applyMiddleware)

export default store