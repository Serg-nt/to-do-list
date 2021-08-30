import firebase from "firebase";
import {db} from "../db";



export const authAPI = {
    login(email, password) {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
    },
    logout() {
        return firebase
            .auth()
            .signOut()
    },
    createAccount(email, password) {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
    },
    setUserData(email, userId) {
        return db.collection('users')
            .add({
                email: email,
                userId: userId
            })
    },
}

export const tasksBoardsAPI = {
    async getTasksBoards(userId) {
        const result = await db.collection('users')
            .where('userId', '==', userId)
            .get()
        return result.docs[0]
            .data()
            .tasksBoards
    },
    async createBoard(userId, boardName) {
        const result = await db.collection('users')
            .where('userId', '==', userId)
            .get()
        const docId = result.docs[0].id
        const newTasksBoards = result.docs[0]
            .data()
            .tasksBoards
        newTasksBoards.push(boardName)
        return db.collection('users')
            .doc(docId)
            .update({tasksBoards: newTasksBoards})
    },
    /// ??? повторение кода, верно ли вообще сделано
    async deleteBoard(userId, boardId) {
        const result = await db.collection('users')
            .where('userId', '==', userId)
            .get()
        const docId = result.docs[0].id
        const newTasksBoards = result.docs[0]
            .data()
            .tasksBoards
        newTasksBoards.splice(boardId, 1)
        return db.collection('users')
            .doc(docId)
            .update({tasksBoards: newTasksBoards})
    },
}

// const getTaskBoard = async (userId) => {
//     const result = await db.collection('users')
//         .where('userId', '==', userId)
//         .get()
//     const docId = result.docs[0].id
//     return result.docs[0]
//         .data()
//         .tasksBoards
// }

export const tasksAPI = {
    async getTasks(userId, boardId) { /// ??? правильно ли писать async в редюсере
        const result = await db.collection('tasks')
            .where('user', '==', userId)
            .where('boardId', '==', boardId)
            .get()
        return result.docs.map(doc => doc.data())
    },
    toggleIsCompleted(taskId, isCompleted) {
        return db.collection('tasks')
            .doc(taskId)
            .update({completed: isCompleted})
    },
    updateTask(taskId, taskName) {
        return db.collection('tasks')
            .doc(taskId)
            .update({name: taskName})
    },
    deleteTask(taskId) {
        return db.collection('tasks')
            .doc(taskId)
            .delete()
    },
    async deleteRemoteBoardTasks(userId, boardId) {
        const result = await db.collection('tasks')
            .where('user', '==', userId)
            .where('boardId', '==', boardId)
            .get()
        const arrayDeleteTasks = result.docs.map(doc => doc.id)
        return arrayDeleteTasks.forEach(el => {
            db.collection('tasks')
                .doc(el)
                .delete()
        })
    },
    createTask(taskName, userId, boardId) {
        return db.collection('tasks')
            .add({
                name: taskName,
                completed: false,
                user: userId,
                boardId: boardId,
            })
    }
}
