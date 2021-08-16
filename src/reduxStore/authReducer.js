import {authAPI} from "../api/api";

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';

const initialState = {
    email: null,
    userId: null,
    isAuth: false,
    // email: 'auth@mail.ru',
    // userId: 'p1BuU8BHWMceiNDbuqpbnZ6Ujjf1',
    // isAuth: true,
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


export const setAuthUserData = (email, userId, isAuth) =>
    ({type: SET_AUTH_USER_DATA, email, userId, isAuth})

export const login = (email, password) => async (dispatch) => {
    const response = await authAPI.login(email, password)
    dispatch(setAuthUserData(email, response.user.uid, true))
}

export const logout = () => async(dispatch) => {
    await authAPI.logout()
    dispatch(setAuthUserData(null, null, false))
}

export const createAccount = (email, password) => async (dispatch) => {
    const response = await authAPI.createAccount(email, password)
    await authAPI.setUserData(email, response.user.uid)
    dispatch(setAuthUserData(email, response.user.uid, true))
}

export default authReducer