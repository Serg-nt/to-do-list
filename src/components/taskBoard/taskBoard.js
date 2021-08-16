import React from 'react'
import TaskItem from "./taskItem";
import {connect} from "react-redux";
import {addNewTask, deleteTask, getListOfTasks, toggleIsCompleted, updateTask} from "../../reduxStore/taskBoardReducer";
import NewTask from "./newTask";
import {Redirect} from "react-router-dom";

class TaskBoard extends React.Component {

    componentDidMount() {
        this.props.getListOfTasks(this.props.userId)
    }

    render() {

        if (!this.props.isAuth) {
            return <Redirect to={'/login'}/>
        }

        const items = this.props.tasks
            .sort(item => item.completed ? 1 : -1)
            .map(t => <TaskItem key={t.taskId}
                                name={t.name}
                                taskId={t.taskId}
                                completed={t.completed}
                                updateTask={this.props.updateTask}
                                toggleIsCompleted={this.props.toggleIsCompleted}
                                deleteTask={this.props.deleteTask}
            />)

        return (
            <div>
                <ul>
                    {items}
                </ul>
                <NewTask addNewTask={this.props.addNewTask}
                         userId={this.props.userId}
                />
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    tasks: state.taskBoard.tasks,
    isAuth: state.auth.isAuth,
    userId: state.auth.userId,
})

const TaskBoardContainer = connect(mapStateToProps,
    {updateTask, toggleIsCompleted, deleteTask, addNewTask, getListOfTasks})(TaskBoard)

export default TaskBoardContainer