import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {

    const tasks1: Array<TaskType> = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJs', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
    ]
    const tasks2: Array<TaskType> = [
        // {id: 1, title: 'Hello world', isDone: true},
        // {id: 2, title: 'I am happy', isDone: false},
        // {id: 3, title: 'Yo', isDone: false},
        // {id: 4, title: 'Redux', isDone: false},
    ]

    return (
        <div className="App">
            <Todolist title='What to learn' tasks={tasks1}/>
            <Todolist title='Songs' tasks={tasks2}/>
        </div>
    );
}

export default App;
