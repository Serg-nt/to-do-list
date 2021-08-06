import React, {useState} from 'react'
import classes from "./taskBoard.module.css";

const TaskItem = ({title, taskId, isActiveTask, updateTask, toggleIsActive, deleteTask}) => {

    const [editMode, setEditMode] = useState(false)
    const [taskTitle, setEditTitle] = useState(title)
    const [isActiveState, setIsActiveState] = useState(!isActiveTask)

    const activateEditMode = () => {
        setEditMode(true)
    }

    const onStatusChange = (e) => {
        setEditTitle(e.currentTarget.value)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        updateTask(taskId, taskTitle)
    }

    const activateDeactivate = () => {
        setIsActiveState(!isActiveState)
        toggleIsActive(taskId, isActiveState)
    }

    const removeTask = () => {
        deleteTask(taskId)
    }

    const deletedTask = <span className={classes.deleteTask} onClick={removeTask}>x</span>

    return (
        <li>
            <input type={"checkbox"} onClick={activateDeactivate} onChange={activateDeactivate} defaultChecked={isActiveState}/>

            {!editMode && !isActiveState &&
            <span onClick={activateEditMode}>
                {taskTitle}
                {deletedTask}
            </span>
            }
            {editMode && !isActiveState &&
            <input onBlur={deactivateEditMode} onSubmit={deactivateEditMode} onChange={onStatusChange}
                   value={taskTitle} autoFocus={true}/>
            }
            {isActiveState &&
            <span className={classes.deactivateTask}>
                {taskTitle}
                {deletedTask}
            </span>
            }

        </li>
    )
}

export default TaskItem