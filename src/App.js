import React from "react";
import classes from './App.module.css';
import store from "./../src/reduxStore/reduxStore";

class App extends React.Component {
    render() {
        return <div className={classes.appWrapper}>
                <div className={classes.app}>
                    <ul>
                        <li>Задача 1</li>
                        <li>Задача 2</li>
                        <li>Задача 3</li>
                        <li>Задача 4</li>
                        <li>Задача 5</li>
                    </ul>
                </div>
            </div>
    }
}

const AppContainer = () => {
    return <App store={store} />
}

export default AppContainer;
