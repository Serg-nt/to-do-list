import React from "react";
import classes from './App.module.css';
import Navbar from "./components/navbar/navbar";
import TaskBoardContainer from "./components/taskBoard/taskBoard";
import firebase from "firebase";

class App extends React.Component {
    componentDidMount() {
        const db = firebase.database()
        console.log(db)
    }

    render() {
        return (
            <div className={classes.appWrapper}>
                <Navbar/>
                <TaskBoardContainer/>
            </div>
        )
    }
}

export default App;
