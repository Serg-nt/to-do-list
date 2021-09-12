import React from 'react'
import TaskItem from "./taskItem";
import {connect} from "react-redux";
import {createTask, deleteTask, getListOfTasks, toggleIsCompleted, updateTask} from "../../reduxStore/taskReducer";
import NewTask from "./newTask";
import classes from './taskBoard.module.css'
import {Redirect} from "react-router-dom";
import {deleteBoard} from "../../reduxStore/tasksBoardsReducer";

class TaskBoard extends React.Component {

    componentDidMount() {
        this.props.getListOfTasks(this.props.userId, this.props.activeBoardId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.activeBoardId !== prevProps.activeBoardId) {
            this.props.getListOfTasks(this.props.userId, this.props.activeBoardId)
        }
    }

    render() {

        if (!this.props.isAuth) {
            return <Redirect to={'/login'}/>
        }
        if (this.props.activeBoardId == null) {
            return <Redirect to={'/boardSelection'}/>
        }

        const items = this.props.tasks
            .sort(item => item.completed ? 1 : -1)
            .map(t => <TaskItem name={t.name}
                                key={Math.random()}
                                taskId={t.taskId}
                                completed={t.completed}
                                updateTask={this.props.updateTask}
                                toggleIsCompleted={this.props.toggleIsCompleted}
                                deleteTask={this.props.deleteTask}
            />)

        const removeBoard = () => {
            this.props.deleteBoard(this.props.userId, this.props.activeBoardId)
        }

        const deletedBoard = <span className={classes.deleteTask}
                                   onClick={removeBoard}>x</span>

        return (
            <div className={classes.taskBoard}>
                <b>{this.props.tasksBoards[this.props.activeBoardId].taskBoardName}{deletedBoard}</b>
                <ul>
                    {items}
                </ul>
                <NewTask createTask={this.props.createTask}
                         userId={this.props.userId}
                         boardId={this.props.activeBoardId}
                />
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    tasks: state.task.tasks,
    isAuth: state.auth.isAuth,
    userId: state.auth.userId,
    activeBoardId: state.tasksBoards.activeBoardId,
    tasksBoards: state.tasksBoards.tasksBoards,
})

const TaskBoardContainer = connect(mapStateToProps,
    {updateTask, toggleIsCompleted, deleteTask, createTask, getListOfTasks, deleteBoard})(TaskBoard)

export default TaskBoardContainer