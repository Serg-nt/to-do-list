import React from "react";
import {NavLink} from "react-router-dom";
import classes from './boardSelection.module.css'

const BoardItem = ({name, boardId, setActiveBoardAC}) => {

    const chooseBoard = () => {
        setActiveBoardAC(boardId)
    }

    return (
        <div className={classes.navLink}>
           <button onClick={chooseBoard}>
               <NavLink to="/taskBoard">
                   {name}
               </NavLink>
           </button>
        </div>
    )
}

export default BoardItem