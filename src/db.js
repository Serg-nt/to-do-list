import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDYqVveT6hQg6Jofcz_TZJ9gQqQrRjGMJk",
    authDomain: "todolist-831f7.firebaseapp.com",
    databaseURL: "https://todolist-831f7-default-rtdb.firebaseio.com",
    projectId: "todolist-831f7",
    storageBucket: "todolist-831f7.appspot.com",
    messagingSenderId: "1085610781823",
    appId: "1:1085610781823:web:447a26997ced991c92234a"
}

firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })