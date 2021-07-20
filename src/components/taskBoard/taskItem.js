import React, {useEffect, useState} from 'react'
import classes from "./taskBoard.module.css";

const TaskItem = ({title}) => {

    const [editMode, setEditMode] = useState(false)
    const [taskTitle, setTitle] = useState(title)

    useEffect( () => {
        setTitle(title)
    }, [title] )

    const activateEditMode = () => {
        setEditMode(true)
    }

    const onStatusChange = (e) => {
        setTitle(e.currentTarget.value)
    }

    const deactivateEditMode = () => {

        setEditMode(false)
    }

    return (
        <li>
            <input type={"checkbox"} onClick={() => {}} />
            {!editMode &&
            <div>
                <span onClick={activateEditMode}>{title}</span>
            </div>
            }
            {editMode &&
            <div>
                <input onBlur={deactivateEditMode} onSubmit={deactivateEditMode} onChange={onStatusChange}
                       value={taskTitle} autoFocus={true}/>
            </div>
            }
        </li>
    )
}

export default TaskItem