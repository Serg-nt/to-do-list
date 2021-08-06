import React from 'react'
import classes from "./taskBoard.module.css";
import TaskItem from "./taskItem";
import {connect} from "react-redux";
import {addNewTask, deleteTask, toggleIsActive, updateTask} from "../../reduxStore/taskBoardReducer";
import NewTask from "./newTask";

class TaskBoard extends React.Component {

    componentDidMount() {
    }

    render() {

        const items = this.props.tasks
            .sort(item => item.isActiveTask ? -1 : 1)
            .map(t => <TaskItem key={t.taskId}
                                title={t.title}
                                taskId={t.taskId}
                                order={t.order}
                                isActiveTask={t.isActiveTask}
                                updateTask={this.props.updateTask}
                                toggleIsActive={this.props.toggleIsActive}
                                deleteTask={this.props.deleteTask}
            />)

        return (
            <div className={classes.board}>
                <ul>
                    {items}
                </ul>
                <NewTask addNewTask={this.props.addNewTask}/>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    tasks: state.taskBoard.tasks
})

const TaskBoardContainer = connect(mapStateToProps,
    {updateTask, toggleIsActive, deleteTask, addNewTask})(TaskBoard)

export default TaskBoardContainer