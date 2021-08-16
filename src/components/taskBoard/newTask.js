import React, {useState} from "react";

const NewTask = ({addNewTask, userId}) => {

    const [taskName, setEditName] = useState('')

    const onStatusChange = (e) => {
        setEditName(e.currentTarget.value)
    }

    const addTask = () => {
        if(taskName !== '') {
            addNewTask(taskName, userId)
        }
        setEditName('')
    }

    return (
        <div>
            <input placeholder="Enter new task"
                   onBlur={addTask}
                   onChange={onStatusChange}
                   value={taskName}
            />
        </div>
    )
}

export default NewTask