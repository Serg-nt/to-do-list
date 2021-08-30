import React from "react";
import classes from './navbar.module.css';
import {connect} from "react-redux";
import BoardItem from "../boardSelection/boardItem";
import {createNewBoard, setActiveBoardAC} from "../../reduxStore/tasksBoardsReducer";
import NewBoard from "../boardSelection/newBoard";

const Navbar = ({tasksBoards, activeBoardId, userId, createNewBoard, setActiveBoardAC}) => {

    if(activeBoardId == null) {
        return (<div className={classes.navbar}>
                </div>)
    }

    const items = tasksBoards
        .map((b, index) =>
            <BoardItem key={index}
                       boardId={index}
                       name={b}
                       setActiveBoardAC={setActiveBoardAC}
            />)

    return (
        <div className={classes.navbar}>
            {items}
            <NewBoard userId={userId}
                      createNewBoard={createNewBoard}
            />
        </div>
    )
}

const mapStateToProps = (state) => ({
    activeBoardId: state.tasksBoards.activeBoardId,
    tasksBoards: state.tasksBoards.tasksBoards,
    userId: state.auth.userId,
})

const NavbarContainer = connect(mapStateToProps,
    {setActiveBoardAC, createNewBoard})(Navbar)

export default NavbarContainer