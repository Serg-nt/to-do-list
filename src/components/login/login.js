import React, {useState} from "react";
import classes from './login.module.css'
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {createAccount, login} from "../../reduxStore/authReducer";


const LoginForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit} className={classes.item}>
            <div>
                <Field placeholder="Enter Email"
                       name="email"
                       component="input"
                />
            </div>
            <div>
                <Field placeholder="Enter password"
                       name="password"
                       type="password"
                       component="input"
                />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = ({isAuth, login, createAccount}) => {

    let [hasAccount, setHasAccount] = useState(true)

    const signUp = () => {
        setHasAccount(false)
    }

    const signIn = () => {
        setHasAccount(true)
    }

    const onSubmit = (formData) => {
         if(hasAccount) {
             login(formData.email, formData.password)
         } else {
             createAccount(formData.email, formData.password)
         }
    }

    if(isAuth) {
        return <Redirect to={'/boardSelection'} />
    }

    return(
        <div className={classes.loginForm}>
            <button disabled={hasAccount} onClick={signIn} >Sign In</button>
            <button disabled={!hasAccount} onClick={signUp} >Sign Up</button>
            <p>Please, enter email and password</p>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
})

const LoginContainer = connect(mapStateToProps, {login, createAccount})(Login)

export default LoginContainer