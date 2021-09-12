import {tasksAPI, tasksBoardsAPI} from "../api/api";
import {deleteRemoteBoardTasksAC} from "./taskReducer";

const SET_TASKS_BOARDS_DATA = 'SET_TASKS_BOARDS_DATA';
const SET_ACTIVE_BOARD = 'SET_ACTIVE_BOARD';
const DELETE_ACTIVE_BOARD = 'DELETE_ACTIVE_BOARD';
const DELETE_BOARD = 'DELETE_BOARD';
const CREATE_NEW_BOARD = 'CREATE_NEW_BOARD';

const initialState = {
    tasksBoards: [],
    activeBoardId: null,
}

const tasksBoardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASKS_BOARDS_DATA:
            return {
                ...state, tasksBoards: action.tasksBoards
            }
        case SET_ACTIVE_BOARD:
            return {
                ...state, activeBoardId: action.boardId
            }
        case DELETE_ACTIVE_BOARD:
            return {
                ...state, tasksBoards: [], activeBoardId: null
            }
        case DELETE_BOARD:
            const newTasksBoards = [...state.tasksBoards]
            newTasksBoards.splice(action.boardId, 1)
            return {
                ...state, tasksBoards: newTasksBoards, activeBoardId: null
            }
        case CREATE_NEW_BOARD:
            return {
                ...state, tasksBoards: [...state.tasksBoards, {taskBoardName: action.boardName}]
            }
        default:
            return state
    }
}

export const setTasksBoardsDataAC = (tasksBoards) =>
    ({type: SET_TASKS_BOARDS_DATA, tasksBoards})
export const setActiveBoardAC = (boardId) =>
    ({type: SET_ACTIVE_BOARD, boardId})
export const deleteActiveBoardAC = () =>
    ({type: DELETE_ACTIVE_BOARD})
export const createNewBoardAC = (boardName) =>
    ({type: CREATE_NEW_BOARD, boardName})
export const deleteBoardAC = (boardId) =>
    ({type: DELETE_BOARD, boardId})

export const readTasksBoards = (userId) => async (dispatch) => {
    const tasksBoards = await tasksBoardsAPI.getTasksBoards(userId)
    dispatch(setTasksBoardsDataAC(tasksBoards))
    console.log(tasksBoards)
}

export const createNewBoard = (userId, boardName) => async (dispatch) => {
    await tasksBoardsAPI.createBoard(userId, boardName)
    dispatch(createNewBoardAC(boardName))
}

export const deleteBoard = (userId, boardId) => async (dispatch) => {
    await tasksBoardsAPI.deleteBoard(userId, boardId)
    await tasksAPI.deleteRemoteBoardTasks(userId, boardId)
    dispatch(deleteBoardAC(boardId))
    dispatch(deleteRemoteBoardTasksAC(userId, boardId))
}

export default tasksBoardsReducer