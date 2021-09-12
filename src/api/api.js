import firebase from "firebase";
import {db} from "../db";

const getTaskByBoardId = (userId, boardId) => {
    return db.collection('tasks')
        .where('user', '==', userId)
        .where('boardId', '==', boardId)
        .get()
}

const getTaskByUserId = (userId) => {
    return db.collection('users')
        .where('userId', '==', userId)
        .get()
}

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
        const result = await getTaskByUserId(userId)
        return result.docs[0]
            .data()
            .tasksBoards.map((doc) => ({taskBoardName: doc}))
    },
    async createBoard(userId, boardName) {
        const result = await getTaskByUserId(userId)
        const docId = result.docs[0].id
        const newTasksBoards = result.docs[0]
            .data()
            .tasksBoards
        newTasksBoards.push(boardName)
        return db.collection('users')
            .doc(docId)
            .update({tasksBoards: newTasksBoards})
    },

    async deleteBoard(userId, boardId) {
        const result = await getTaskByUserId(userId)
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

export const tasksAPI = {
    async getListOfTasks(userId, boardId) {
        const result = await getTaskByBoardId(userId, boardId)
        debugger
        return result.docs.map(doc => ({taskId: doc.id, ...doc.data()}))
        // result.docs.filter(doc => (doc.data().completed == false)).length
        // result.docs.length
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
        const result = await getTaskByBoardId(userId, boardId)
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
