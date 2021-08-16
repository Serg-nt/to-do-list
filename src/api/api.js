import firebase from "firebase";
import {db} from "../index";

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

export const tasksAPI = {
    getListOfTasks(userId) {
        return db.collection('tasks')
            .where('user', '==', userId)
            .get()
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
        return db.collection('tasks').
            doc(taskId)
            .delete()
    },
    addNewTask(taskName, userId) {
        return db.collection('tasks')
            .add({
                name: taskName,
                completed: false,
                user: userId
            })
    }
}
