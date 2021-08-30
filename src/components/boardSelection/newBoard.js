import React, {useState} from "react";
import classes from "./boardSelection.module.css";

const NewBoard = ({createNewBoard, userId}) => {

    const [boardName, setEditName] = useState('')

    const onStatusChange = (e) => {
        setEditName(e.currentTarget.value)
    }

    const addBoard = () => {
        if(boardName !== '') {
            createNewBoard(userId, boardName)
        }
        setEditName('')
    }

    return (
        <div className={classes.newBoard}>
            <input placeholder="Enter new board"
                   onBlur={addBoard}
                   onChange={onStatusChange}
                   value={boardName}
            />
        </div>
    )
}

export default NewBoard