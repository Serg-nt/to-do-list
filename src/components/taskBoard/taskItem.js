import React from 'react'
import classes from "./taskBoard.module.css";

const TaskItem = (props) => {
    return (
        <li>{props.title}</li>
    )
}

export default TaskItem