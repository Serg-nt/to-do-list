import {authAPI} from "../api/api";
import {deleteActiveBoardAC} from "./tasksBoardsReducer";

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';

const initialState = {
    email: null,
    userId: null,
    isAuth: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state, email: action.email, userId: action.userId, isAuth: action.isAuth
            }
        default:
            return state
    }
}


export const setAuthUserDataAC = (email, userId, isAuth) =>
    ({type: SET_AUTH_USER_DATA, email, userId, isAuth})

export const login = (email, password) => async (dispatch) => {
    const response = await authAPI.login(email, password)
    const userId = response.user.uid
    dispatch(setAuthUserDataAC(email, userId, true))
}

export const logout = () => async (dispatch) => {
    await authAPI.logout()
    dispatch(setAuthUserDataAC(null, null, false))
    dispatch(deleteActiveBoardAC())
}

export const createAccount = (email, password) => async (dispatch) => {
    const response = await authAPI.createAccount(email, password)
    await authAPI.setUserData(email, response.user.uid)
    dispatch(setAuthUserDataAC(email, response.user.uid, true))
}

export default authReducer