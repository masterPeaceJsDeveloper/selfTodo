import React from 'react';
import {Button} from "./Button";
import {FilterValue} from "./App";

type PropsType = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: number) => void
    changeFilter: (filter: FilterValue) => void
}
export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = ({title, tasks, deleteTask, changeFilter}: PropsType) => {
    return (
        <div>
            <div>
                <h3>{title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                {tasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    <ul>
                        {tasks.map(task => {
                            return <li key={task.id}>
                                <input type='checkbox' checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button title={'x'} onClick={()=>deleteTask(task.id)}></Button>
                            </li>
                        })}
                    </ul>
                )}
                <div>
                    <Button title={'All'} onClick={()=> changeFilter('all')}/>
                    <Button title={'Active'} onClick={()=> changeFilter('active')}/>
                    <Button title={'Completed'} onClick={()=> changeFilter('completed')}/>
                </div>
            </div>
        </div>
    );
};

