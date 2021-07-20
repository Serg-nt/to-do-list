
const SET_TASK = 'SET_TASK';

const initialState = {
    tasks: [
        { taskId: 1, title: "Task 1", isActive: true, order: 1 },
        { taskId: 2, title: "Task 2", isActive: true, order: 2 },
        { taskId: 3, title: "Task 3", isActive: true, order: 3 },
        { taskId: 4, title: "Task 4", isActive: false, order: 4 },
        { taskId: 5, title: "Task 5", isActive: false, order: 5 },
        { taskId: 6, title: "Task 6", isActive: false, order: 6 },
    ],
}

const taskBoardReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASK:
            return {
                ...state,
                initialized: true,
            }
        default:
            return state
    }
}

const updateTitle = (title, taskId) => ({
    type: SET_TASK,
    title,
    taskId
})

export default taskBoardReducer