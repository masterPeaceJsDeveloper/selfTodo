import React, {type ChangeEvent, type KeyboardEvent, useState} from 'react';
import {Button} from "./Button";
import {FilterValue, TodolistType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
    tasks: TaskType[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValue) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
}

export const Todolist = (props: PropsType) => {
    const {
        todolist: {id, title, filter}, tasks, deleteTask, changeFilter, createTask, changeTaskStatus, deleteTodolist
    } = props

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createTaskHandler = (todolistId: string) => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
            createTask(todolistId, trimmedTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null)
    }
    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>, todolistId: string) => {
        if (event.key === 'Enter') {
            createTaskHandler(todolistId)
        }
    }

    const changeFilterHandler = (filter: FilterValue) => {
        changeFilter(id, filter)
    }
    const deleteTodolistHandler = (todolistId: string) => {
        deleteTodolist(todolistId)
    }
    return (
        <div>
            <div className={'container'}>
                <h3>{title}</h3>
                <Button title={'x'} onClick={()=>deleteTodolistHandler(id)}/>
            </div>
            <div>
                <input className={error ? 'error' : ''}
                       value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyDown={(e) => createTaskOnEnterHandler(e, props.todolist.id)}/>
                <Button title={'+'} onClick={() => createTaskHandler(props.todolist.id)}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const deleteTaskHandler = (todolistId: string) => {
                            deleteTask(todolistId, task.id)
                        }
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, todolistId: string) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(todolistId, task.id, newStatusValue)
                        }
                        return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type='checkbox' checked={task.isDone}
                                   onChange={(e) => changeTaskStatusHandler(e, props.todolist.id)}/>
                            <span>{task.title}</span>
                            <Button title={'x'} onClick={() => deleteTaskHandler(props.todolist.id)}/>
                        </li>
                    })}
                </ul>
            )}
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}
                        onClick={() => changeFilterHandler('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}
                        onClick={() => changeFilterHandler('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}
                        onClick={() => changeFilterHandler('completed')}/>
            </div>
        </div>
    )
        ;
};

