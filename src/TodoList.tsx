import React, {useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string)=>void
}

export function Todolist(props: PropsType) {
    const [newTitle, setNewTitle] = useState('')

    {/*const changeFilterAllHandler =()=> {
        props.changeFilter("all")
    }
    const changeFilterActiveHandler =()=> {
        props.changeFilter("active")
    }
    const changeFilterCompletedHandler =()=> {
        props.changeFilter("completed")
    }*/}
    const changeFilterHandler =(filter: FilterValuesType)=> {
        props.changeFilter(filter)
    }

    /*const removeTaskHandler =(taskId: string)=> {
        props.removeTask(taskId)
    }*/

    const mapped = props.tasks.map(t => {
        const removeTaskHandler =()=> {
            props.removeTask(t.id)
        }
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    } )

    const addTaskHandler =()=> {
        props.addTask(newTitle)
        setNewTitle('')
    }

    const onKeyDownHandler =(e: KeyboardEvent<HTMLInputElement>)=>{
        if (e.key === "Enter") {
            addTaskHandler()
        }
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTitle}
                   onChange={(e)=>{setNewTitle(e.currentTarget.value)}}
                   onKeyDown={onKeyDownHandler}
            />
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {mapped}
        </ul>
        <div>
           {/* <button onClick={ () => { props.changeFilter("all") } }>All</button>*/}
            <button onClick={()=> changeFilterHandler('all') }>All</button>
            {/*<button onClick={ () => { props.changeFilter("active") } }>Active</button>*/}
            <button onClick={ ()=>changeFilterHandler('active') }>Active</button>
            {/*<button onClick={ () => { props.changeFilter("completed") } }>Completed</button>*/}
            <button onClick={ ()=>changeFilterHandler('completed')}>Completed</button>
        </div>
    </div>
}
