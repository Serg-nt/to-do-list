import React, {useState} from 'react'
import classes from "./taskBoard.module.css";

const TaskItem = ({name, taskId, completed, updateTask, toggleIsCompleted, deleteTask}) => {

    const [editMode, setEditMode] = useState(false)
    const [taskName, setEditName] = useState(name)

    const activateEditMode = () => {
        setEditMode(true)
    }

    const onStatusChange = (e) => {
        setEditName(e.currentTarget.value)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        updateTask(taskId, taskName)
    }

    const activateDeactivate = () => {
        toggleIsCompleted(taskId, !completed)
    }

    const removeTask = () => {
        deleteTask(taskId)
    }

    const deletedTask = <span className={classes.deleteTask} onClick={removeTask}>x</span>

    return (
        <li>
            <input type={"checkbox"}
                   onChange={activateDeactivate}
                   defaultChecked={completed}/>
            {!editMode && !completed &&
                <span>
                    <span onClick={activateEditMode}>
                        {taskName}
                    </span>
                    {deletedTask}
                </span>
            }
            {editMode && !completed &&
            <input onBlur={deactivateEditMode} onSubmit={deactivateEditMode} onChange={onStatusChange}
                   value={taskName} autoFocus={true}/>
            }
            {completed &&
            <span className={classes.deactivateTask}>
                {taskName}
                {deletedTask}
                </span>
            }
        </li>
    )
}

export default TaskItem