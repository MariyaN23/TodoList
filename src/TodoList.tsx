import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {Button} from './components/Button';

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

    const changeFilterHandler =(filter: FilterValuesType)=> {
        props.changeFilter(filter)
    }

    const mapped = props.tasks.map(t => {
        const removeTaskHandler =()=> {
            props.removeTask(t.id)
        }
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <Button name={"x"} callBack={removeTaskHandler}/>
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

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
        setNewTitle(e.currentTarget.value)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
            />
            <Button name={"+"} callBack={addTaskHandler}/>
        </div>
        <ul>
            {mapped}
        </ul>
        <div>
            <Button name={"All"} callBack={()=> changeFilterHandler('all')}/>
            <Button name={"Active"} callBack={()=>changeFilterHandler('active')}/>
            <Button name={"Completed"} callBack={()=>changeFilterHandler('completed')}/>
        </div>
    </div>
}
