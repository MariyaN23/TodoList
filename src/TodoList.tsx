import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {Button} from './components/Button';
import s from './Todolist.module.css'

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
    changeIsDone: (taskId: string, isDone: boolean)=>void
}

export function Todolist(props: PropsType) {
    const [newTitle, setNewTitle] = useState('')

    const [error, setError] = useState<string | null>(null)

    const [buttonName, setButtonName] = useState('all')

    const changeFilterHandler =(filter: FilterValuesType)=> {
        props.changeFilter(filter)
        setButtonName(filter)

    }

    const mapped = props.tasks.map(t => {
        const removeTaskHandler =()=> props.removeTask(t.id)
        const changeIsDoneHandler =(e: ChangeEvent<HTMLInputElement>)=> {
            props.changeIsDone(t.id, e.currentTarget.checked)
        }

        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone} onChange={changeIsDoneHandler}/>
                <span>{t.title}</span>
                <Button name={"x"} callBack={removeTaskHandler}/>
            </li>
        )
    } )

    const addTaskHandler =()=> {
        if (newTitle.trim() !== '') {
            props.addTask(newTitle.trim())
            setNewTitle('')
        } else {
            setError("Title is required")
        }
    }

    const onKeyDownHandler =(e: KeyboardEvent<HTMLInputElement>)=>{
        if (e.key === "Enter") {
            addTaskHandler()
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
        setError(null)
        setNewTitle(e.currentTarget.value)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? s.error : ''}
                value={newTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
            />
            <Button name={"+"} callBack={addTaskHandler}/>
            {error && <div className={error ? s.errorMessage : s.errorMessageNo}>{error}</div>}
        </div>
        <ul>
            {mapped}
        </ul>
        <div>
            <Button className={buttonName === "all" ? s.activeFilter : ''} name={"All"} callBack={()=> changeFilterHandler('all')} />
            <Button className={buttonName === "active" ? s.activeFilter : ''} name={"Active"} callBack={()=>changeFilterHandler('active')}/>
            <Button className={buttonName === "completed" ? s.activeFilter : ''} name={"Completed"} callBack={()=>changeFilterHandler('completed')}/>
        </div>
    </div>
}
