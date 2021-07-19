import React from 'react'
import classes from "./taskBoard.module.css";
import TaskItem from "./taskItem";
import {connect} from "react-redux";

const TaskBoard = (props) => {

    const activeTaskItems = props.tasks
        .filter(item => item.isActive)
        .map(t => <TaskItem title={t.title} key={t.id} />)

    const completedTaskItems = props.tasks
        .filter(item => !item.isActive)
        .map(t => <TaskItem title={t.title} key={t.id} />)

    return (
        <div className={classes.board}>
            <ul>
                { activeTaskItems }
                <hr />
                { completedTaskItems }
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => ({
    tasks: state.taskBoard.tasks
})

const mapDispatchToProps = (dispatch) => {

}

const TaskBoardContainer = connect(mapStateToProps, mapDispatchToProps)(TaskBoard)

export default TaskBoardContainer