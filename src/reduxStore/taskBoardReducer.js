import {tasksAPI} from "../api/api";

const SET_TASK = 'SET_TASK';
const TOGGLE_IS_COMPLETED = 'TOGGLE_IS_COMPLETED';
const DELETE_TASK = 'DELETE_TASK';
const ADD_NEW_TASK = 'ADD_NEW_TASK';
const GET_LIST_OF_TASKS = 'GET_LIST_OF_TASKS';

const initialState = {
    tasks: [],
}

const taskBoardReducer = (state = initialState, action) => {
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
        case ADD_NEW_TASK:
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
export const addNewTaskAC = (taskName, userId, taskId) => ({type: ADD_NEW_TASK, taskName, userId, taskId})

export const getListOfTasks = (userId) => async (dispatch) => {
    const listTasks = []
    const response = await tasksAPI.getListOfTasks(userId)
    response.docs.forEach(doc => {
        const task = doc.data()
        task.taskId = doc.id
        listTasks.push(task)
    })
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
    await tasksAPI.deleteTask(taskId)
    dispatch(deleteTaskAC(taskId))
}

export const addNewTask = (taskName, userId) => async (dispatch) => {
    const response = await tasksAPI.addNewTask(taskName, userId)
    const taskId = response.id
    dispatch(addNewTaskAC(taskName, userId, taskId))
}


export default taskBoardReducer