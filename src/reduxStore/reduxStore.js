import {applyMiddleware, combineReducers, createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import taskReducer from "./taskReducer";
import {reducer as formReducer} from 'redux-form'
import authReducer from "./authReducer";
import tasksBoardsReducer from "./tasksBoardsReducer";

const reducers = combineReducers({
    task: taskReducer,
    tasksBoards: tasksBoardsReducer,
    auth: authReducer,
    form: formReducer,
})

const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(thunkMiddleware)
    )
)

window.store = store

export default store