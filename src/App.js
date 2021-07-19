import React from "react";
import classes from './App.module.css';
import Navbar from "./components/navbar/navbar";
import TaskBoardContainer from "./components/taskBoard/taskBoard";

class App extends React.Component {
    render() {
        return (
            <div className={classes.appWrapper}>
                <Navbar store={this.props.store}/>
                <TaskBoardContainer />
            </div>
        )
    }
}

export default App;
