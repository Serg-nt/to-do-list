import {tasksAPI} from "../api/api";

const SET_TASK = 'SET_TASK';
const TOGGLE_IS_COMPLETED = 'TOGGLE_IS_COMPLETED';
const DELETE_TASK = 'DELETE_TASK';
const CREATE_TASK = 'CREATE_TASK';
const GET_LIST_OF_TASKS = 'GET_LIST_OF_TASKS';
const DELETE_REMOTE_BOARD_TASKS = 'DELETE_REMOTE_BOARD_TASKS';

const initialState = {
    tasks: [],
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_OF_TASKS:
            return {
                ...state,
                tasks: action.listTasks,
            }
        case SET_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => task.taskId === action.taskId
                    ? {...task, name: action.taskName}
                    : task)
            }
        case TOGGLE_IS_COMPLETED:
            return {
                ...state,
                tasks: state.tasks.map(task => task.taskId === action.taskId
                    ? {...task, completed: action.isCompleted}
                    : task)
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.taskId !== action.taskId)
            }
        case DELETE_REMOTE_BOARD_TASKS:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.taskId !== action.taskId)
                    .filter(task => task.boardId !== action.boardId)
            }
        case CREATE_TASK:
            const newTask = {
                name: action.taskName,
                completed: false,
                user: action.userId,
                taskId: action.taskId
            }
            return {
                ...state,
                tasks: [...state.tasks, newTask],
            }
        default:
            return state
    }
}

export const getTasksAC = (listTasks) => ({type: GET_LIST_OF_TASKS, listTasks})
export const setUpdateTaskAC = (taskId, taskName) => ({type: SET_TASK, taskId, taskName})
export const setFlagIsActiveAC = (taskId, isCompleted) => ({type: TOGGLE_IS_COMPLETED, taskId, isCompleted})
export const deleteTaskAC = (taskId) => ({type: DELETE_TASK, taskId})
export const createTaskAC = (taskName, userId, taskId) => ({type: CREATE_TASK, taskName, userId, taskId})
export const deleteRemoteBoardTasksAC = (userId, boardId) => ({type: DELETE_REMOTE_BOARD_TASKS, userId, boardId})

export const getListOfTasks = (userId, boardId) => async (dispatch) => {
    const listTasks = await tasksAPI.getTasks(userId, boardId)
    dispatch(getTasksAC(listTasks))
    console.log(listTasks)
}

export const toggleIsCompleted = (taskId, completed) => async (dispatch) => {
    await tasksAPI.toggleIsCompleted(taskId, completed)
    dispatch(setFlagIsActiveAC(taskId, completed))
}

export const updateTask = (taskId, taskName) => async (dispatch) => {
    await tasksAPI.updateTask(taskId, taskName)
    dispatch(setUpdateTaskAC(taskId, taskName))
}

export const deleteTask = (taskId) => async (dispatch) => {
    debugger
    await tasksAPI.deleteTask(taskId)
    dispatch(deleteTaskAC(taskId))
}

export const createTask = (taskName, userId, boardId) => async (dispatch) => {
    const response = await tasksAPI.createTask(taskName, userId, boardId)
    const taskId = response.id
    dispatch(createTaskAC(taskName, userId, taskId, boardId))
}


export default taskReducer