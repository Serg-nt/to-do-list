import {applyMiddleware, combineReducers, createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import taskBoardReducer from "./taskBoardReducer";
import {reducer as formReducer} from 'redux-form'
import authReducer from "./authReducer";

const reducers = combineReducers({
    taskBoard: taskBoardReducer,
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