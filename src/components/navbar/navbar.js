import React from "react";
import classes from './navbar.module.css';

const Navbar = (props) => {
    return (
        <div className={classes.navbar}>
            Buttons of task boards
            <span>{props.store}</span>
        </div>
    )
}

export default Navbar