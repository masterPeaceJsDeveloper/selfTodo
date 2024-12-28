import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValue = 'all' | 'active' | 'completed'

function App() {

    const [filter, setFilter] = useState<FilterValue>('all');

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJs', isDone: false},
        // {id: 4, title: 'Redux', isDone: false},
        // {id: 5, title: 'Typescript', isDone: false},
        // {id: 6, title: 'RTK query', isDone: false},
    ])

    const deleteTask = (taskId: string) => {
        const filteredTasks = tasks.filter(task => {
            return task.id !== taskId
        })
       setTasks(filteredTasks)
    }
    const changeFilter = (filter: FilterValue) => {
        setFilter(filter)
    }
    const createTask = () => {
        const newTask = {id:v1(), title: 'new Task', isDone: false}
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }
    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.isDone)
    }

    return (
        <div className="App">
            <Todolist title='What to learn'
                      tasks={filteredTasks}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
                      createTask={createTask}
            />
        </div>
    );
}

export default App;
