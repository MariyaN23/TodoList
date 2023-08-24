import React, {useState} from 'react';
import {ActiveType} from './App';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    remove: (id: number)=>void
    //filter: (buttonName: ActiveType)=>void
}

export function Todolist(props: PropsType) {
    let [active, setActive] = useState<ActiveType>('All')

    const filterTask = (buttonName: ActiveType) => {
        setActive(buttonName)
    }
    let durshlag = props.tasks
    if (active === 'Active') {
        durshlag = props.tasks.filter(el => el.isDone)
    }
    if (active === 'Completed') {
        durshlag = props.tasks.filter(el => !el.isDone)
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {durshlag.map((task)=>{
                return (
                <li key={task.id}>
                    <button onClick={()=>props.remove(task.id)}>X</button>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                </li>
                )
            })}
        </ul>
        <div>
            <button onClick={()=>filterTask('All')}>All</button>
            <button onClick={()=>filterTask('Active')}>Active</button>
            <button onClick={()=>filterTask('Completed')}>Completed</button>
        </div>
    </div>
}
