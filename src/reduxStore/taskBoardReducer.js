
const initialState = {
    tasks: [
        { id: 1, title: "Task 1", isActive: true, order: 1 },
        { id: 2, title: "Task 2", isActive: true, order: 2 },
        { id: 3, title: "Task 3", isActive: true, order: 3 },
        { id: 4, title: "Task 4", isActive: false, order: 4 },
        { id: 5, title: "Task 5", isActive: false, order: 5 },
        { id: 6, title: "Task 6", isActive: false, order: 6 },
    ],
}

const taskBoardReducer = (state = initialState, action) => {
    switch (action.type) {
        // case INITIALIZED_SUCCESS:
        //     return {
        //         ...state,
        //         initialized: true,
        //     }
        default:
            return state
    }
}

export default taskBoardReducer