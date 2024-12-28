import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValue = 'all' | 'active' | 'completed'

function App() {

    const [filter, setFilter] = useState<FilterValue>('all');

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJs', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'Typescript', isDone: false},
        {id: 6, title: 'RTK query', isDone: false},
    ])

    const deleteTask = (taskId: number) => {
        const filteredTasks = tasks.filter(task => {
            return task.id !== taskId
        })
       setTasks(filteredTasks)
    }
    const changeFilter = (filter: FilterValue) => {
        setFilter(filter)
    }
    let filteredTasks = tasks
    if(filter === 'active') {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if(filter === 'completed') {
        filteredTasks = tasks.filter(task => task.isDone)
    }

    return (
        <div className="App">
            <Todolist title='What to learn'
                      tasks={tasks}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
