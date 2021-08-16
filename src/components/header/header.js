import React from "react";
import classes from './header.module.css'
import {connect} from "react-redux";
import {logout} from "../../reduxStore/authReducer";

const Header = ({isAuth, email, logout}) => {

    return (
        <div className={classes.header}>
            {
                isAuth && <div className={classes.auth}>
                    <span>{email}</span>
                    <button onClick={logout}>Logout</button>
                </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    email: state.auth.email,
})

const HeaderContainer = connect(mapStateToProps, {logout})(Header)

export default HeaderContainer