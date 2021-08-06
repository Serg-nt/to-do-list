import {applyMiddleware, combineReducers, createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import taskBoardReducer from "./taskBoardReducer";

const reducers = combineReducers({
    taskBoard: taskBoardReducer,
})

const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(thunkMiddleware)
    )
)

window.store = store

export default store