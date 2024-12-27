import React from 'react';
import {Button} from "./Button";

type PropsType = {
    title: string
    tasks: TaskType[]
}
export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = ({title, tasks}: PropsType) => {
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
                            </li>
                        })}
                    </ul>
                )}
                <div>
                    <Button title={'All'}/>
                    <Button title={'Active'}/>
                    <Button title={'Completed'}/>
                </div>
            </div>
        </div>
    );
};
