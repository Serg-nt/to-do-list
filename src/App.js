import React from "react";
import classes from './App.module.css';
import Navbar from "./components/navbar/navbar";
import TaskBoardContainer from "./components/taskBoard/taskBoard";
import {Provider} from "react-redux";
import store from "./reduxStore/reduxStore";
import {BrowserRouter, Route} from "react-router-dom";
import LoginContainer from "./components/login/login";
import HeaderContainer from "./components/header/header";
import BoardSelectionContainer from "./components/boardSelection/boardSelection";

class App extends React.Component {
    componentDidMount() {
    }

    render() {
        return (
            <div className={classes.appWrapper}>
                <HeaderContainer/>
                <Navbar/>
                <div className={classes.board}>
                    <Route path='/boardSelection' render={() => <BoardSelectionContainer /> }/>
                    <Route path='/taskBoard' render={() => <TaskBoardContainer /> }/>
                    <Route path='/login' render={() => <LoginContainer /> }/>
                </div>
            </div>
        )
    }
}

const ToDoJSApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
}

export default ToDoJSApp;
