import {combineReducers, compose, createStore} from 'redux';
import taskBoardReducer from "./taskBoardReducer";

const reducers = combineReducers({
    taskBoard: taskBoardReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers())

export default store