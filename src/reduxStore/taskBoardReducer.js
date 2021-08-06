import {taskBoardAPI} from "../api/api";

const SET_TASK = 'SET_TASK';
const TOGGLE_IS_ACTIVE = 'TOGGLE_IS_ACTIVE';
const DELETE_TASK = 'DELETE_TASK';
const ADD_NEW_TASK = 'ADD_NEW_TASK';

const initialState = {
    tasks: [
        {taskId: 1, title: "Task 1", isActiveTask: true},
        {taskId: 2, title: "Task 2", isActiveTask: true},
        {taskId: 3, title: "Task 3", isActiveTask: true},
        {taskId: 4, title: "Task 4", isActiveTask: false},
        {taskId: 5, title: "Task 5", isActiveTask: false},
        {taskId: 6, title: "Task 6", isActiveTask: false},
    ],
}

const taskBoardReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => task.taskId === action.taskId
                    ? {...task, title: action.title}
                    : task)
            }
        case TOGGLE_IS_ACTIVE:
            return {
                ...state,
                tasks: state.tasks.map(task => task.taskId === action.taskId
                    ? {...task, isActiveTask: action.isActiveTask}
                    : task)
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.taskId !== action.taskId)
            }
        case ADD_NEW_TASK:
            const newTask = {
                taskId: Date.now(),
                title: action.title,
                isActiveTask: true
            }
            return {
                ...state,
                tasks: [...state.tasks, newTask],
            }
        default:
            return state
    }
}

export const updateTask = (taskId, title) => ({type: SET_TASK, taskId, title})
export const toggleIsActive = (taskId, isActiveTask) => ({type: TOGGLE_IS_ACTIVE, taskId, isActiveTask})
export const deleteTask = (taskId) => ({type: DELETE_TASK, taskId})
export const addNewTask = (title) => ({type: ADD_NEW_TASK, title})

export default taskBoardReducer