import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {Button} from './components/Button';
import s from './Todolist.module.css'
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';

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
    updateTask: (todoId: string, taskId: string, newTitle: string) => void
    updateTodolistTitle: (todoId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
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
        const updateTaskHandler = (newTitle: string)=> props.updateTask(props.todoId,t.id,newTitle)

        return (
            <li key={t.id} className={t.isDone ? s.isDone : ''} >
                <input type="checkbox" checked={t.isDone} onChange={changeIsDoneHandler}/>
                <EditableSpan title={t.title} callback={updateTaskHandler}/>
                {/*<span>{t.title}</span>*/}
                <Button name={"x"} callBack={removeTaskHandler}/>
            </li>
        )
    } )

    const addTaskHandler =(title: string)=> {
        props.addTask(props.todoId,title)
    }

    const updateTodolistTitleHandler = (newTitle: string) => {
        props.updateTodolistTitle(props.todoId, newTitle)
    }

    return <div>
        <h3> <EditableSpan title={props.title} callback={updateTodolistTitleHandler}/>
            <Button name={'X'} callBack={()=>props.removeTodoList(props.todoId)}/>
        </h3>
        <AddItemForm callBack={addTaskHandler}/>
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
