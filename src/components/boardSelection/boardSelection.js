import React from "react";
import {connect} from "react-redux";
import classes from './boardSelection.module.css'
import {Redirect} from "react-router-dom";
import {createNewBoard, readTasksBoards, setActiveBoardAC} from "../../reduxStore/tasksBoardsReducer";
import BoardItem from "./boardItem";
import NewBoard from "./newBoard";

class BoardSelection extends React.Component {
    componentDidMount() {
        this.props.readTasksBoards(this.props.userId)
    }

    render() {

        if (!this.props.isAuth) {
            return <Redirect to={'/login'}/>
        }

        const items = this.props.tasksBoards
            .map((b, index) =>
                <BoardItem key={index}
                           boardId={index}
                           name={b.taskBoardName}
                           setActiveBoardAC={this.props.setActiveBoardAC}
                />)

        return (
            <div className={classes.main}>
                <p>Select a task list</p>
                <div className={classes.listBoards}>
                    {items}
                    <div>
                        <NewBoard userId={this.props.userId}
                                  createNewBoard={this.props.createNewBoard}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userId: state.auth.userId,
    tasksBoards: state.tasksBoards.tasksBoards,
    isAuth: state.auth.isAuth
})

const BoardSelectionContainer = connect(mapStateToProps, {readTasksBoards, setActiveBoardAC, createNewBoard})(BoardSelection)

export default BoardSelectionContainer