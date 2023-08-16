import React from 'react';

type PropsType = {
    truck: string
    //task: Array<TaskType>
    task: TaskType[]
}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const TodoList = (props: PropsType) => {
    return (
        <div>
            <h3>{props.truck}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.task.map((elementTask)=>{
                    return (
                        <li><input type="checkbox" checked={elementTask.isDone}/> <span>{elementTask.title}</span></li>
                    )
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};