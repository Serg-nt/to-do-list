import React, {useState} from "react";

const NewTask = ({addNewTask}) => {

    const [taskTitle, setEditTitle] = useState('')

    const onStatusChange = (e) => {
        setEditTitle(e.currentTarget.value)
    }

    const addTask = () => {
        if(taskTitle !== '') {
            addNewTask(taskTitle)
        }
        setEditTitle('')
    }

    return (
        <div>
            <input placeholder="Enter new task"
                   onBlur={addTask}
                   onChange={onStatusChange}
                   value={taskTitle}
            />
        </div>
    )
}

export default NewTask