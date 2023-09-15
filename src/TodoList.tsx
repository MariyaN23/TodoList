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
    removeTask: (todoId: string, taskId: string) => void
    changeFilter: (todoId: string, value: FilterValuesType) => void
    addTask: (todoId: string, title: string)=>void
    changeIsDone: (todoId: string, taskId: string, isDone: boolean)=>void
    todoId: string
    removeTodoList: (todoId: string)=>void
}

export function Todolist(props: PropsType) {
    const [newTitle, setNewTitle] = useState('')

    const [error, setError] = useState<string | null>(null)

    const [buttonName, setButtonName] = useState('all')

    const changeFilterHandler =(filter: FilterValuesType)=> {
        props.changeFilter(props.todoId, filter)
        setButtonName(filter)
    }

    const mapped = props.tasks.map(t => {
        const removeTaskHandler =()=> props.removeTask(props.todoId, t.id)
        const changeIsDoneHandler =(e: ChangeEvent<HTMLInputElement>)=> {
            props.changeIsDone(props.todoId, t.id, e.currentTarget.checked)
        }

        return (
            <li key={t.id} className={t.isDone ? s.isDone : ''} >
                <input type="checkbox" checked={t.isDone} onChange={changeIsDoneHandler}/>
                <span>{t.title}</span>
                <Button name={"x"} callBack={removeTaskHandler}/>
            </li>
        )
    } )

    const addTaskHandler =()=> {
        if (newTitle.trim() !== '') {
            props.addTask(props.todoId, newTitle.trim())
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
        <h3> {`${props.title} `}
            <Button name={'X'} callBack={()=>props.removeTodoList(props.todoId)}/>
        </h3>
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
