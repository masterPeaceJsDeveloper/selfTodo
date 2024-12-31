import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValue = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValue
}

export type TasksState = {
    [key: string]:TaskType[]
}

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })

    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })
        // const newTasks = {
        //     ...tasks,
        //     [todolistId]: tasks[todolistId].filter(task => task.id !== taskId),
        // }
        // setTasks(newTasks)
    }
    const changeFilter = (todolistId: string, filter: FilterValue) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist))
    }
    const createTask = (todolistId:string, title: string) => {
        const newTask = {id:v1(), title:title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, isDone } : task)})
    }
    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    return (
        <div className="App">
            {todolists.map(todolist => {
                const todolistTasks = tasks[todolist.id]
                let filteredTasks = todolistTasks
                if (todolist.filter === 'active') {
                    filteredTasks = todolistTasks.filter(task => !task.isDone)
                }
                if (todolist.filter === 'completed') {
                    filteredTasks = todolistTasks.filter(task => task.isDone)
                }

                return (
                    <Todolist key={todolist.id}
                              todolist={todolist}
                              tasks={filteredTasks}
                              deleteTask={deleteTask}
                              changeFilter={changeFilter}
                              createTask={createTask}
                              changeTaskStatus={changeTaskStatus}
                              deleteTodolist={deleteTodolist}

                    />
                )
            })}

        </div>
    );
}

export default App;
