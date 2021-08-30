import React, {useState} from "react";

const NewTask = ({createTask, userId, boardId}) => {

    const [taskName, setEditName] = useState('')

    const onStatusChange = (e) => {
        setEditName(e.currentTarget.value)
    }

    const addTask = () => {
        if(taskName !== '') {
            createTask(taskName, userId, boardId)
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