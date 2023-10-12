import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {TodoListButton} from './components/Button';
import s from './Todolist.module.css'
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {SuperCheckbox} from './components/SuperCheckbox';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todoId: string, taskId: string) => void
    changeFilter: (todoId: string, value: FilterValuesType) => void
    addTask: (todoId: string, title: string) => void
    changeIsDone: (todoId: string, taskId: string, isDone: boolean) => void
    todoId: string
    removeTodoList: (todoId: string) => void
    updateTask: (todoId: string, taskId: string, newTitle: string) => void
    updateTodolistTitle: (todoId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const [buttonName, setButtonName] = useState('all')

    const changeFilterHandler = (filter: FilterValuesType) => {
        props.changeFilter(props.todoId, filter)
        setButtonName(filter)
    }

    const changeIsDoneHandler = (tId: string, checked: boolean) => {
        props.changeIsDone(props.todoId, tId, checked)
    }

    const mapped = props.tasks.map(t => {
        const removeTaskHandler = () => props.removeTask(props.todoId, t.id)
        /*const changeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeIsDone(props.todoId, t.id, e.currentTarget.checked)
        }*/
        const updateTaskHandler = (newTitle: string) => props.updateTask(props.todoId, t.id, newTitle)

        return (
            <li key={t.id} className={t.isDone ? s.isDone : ''}>
                {/*<Checkbox defaultChecked checked={t.isDone} onChange={changeIsDoneHandler} color="secondary"/>*/}
                <SuperCheckbox isDone={t.isDone} callback={(checked)=>changeIsDoneHandler(t.id, checked)}/>
                <EditableSpan title={t.title} callback={updateTaskHandler}/>
                <TodoListButton name={'x'}
                                callBack={removeTaskHandler}
                                style={{
                                    maxWidth: '30px',
                                    maxHeight: '30px',
                                    minWidth: '30px',
                                    minHeight: '30px'
                                }}
                                variant={'contained'}/>
            </li>
        )
    })

    const addTaskHandler = (title: string) => {
        props.addTask(props.todoId, title)
    }

    const updateTodolistTitleHandler = (newTitle: string) => {
        props.updateTodolistTitle(props.todoId, newTitle)
    }

    return <div>
        <h3><EditableSpan title={props.title} callback={updateTodolistTitleHandler}/>
            <IconButton aria-label="delete" onClick={() => props.removeTodoList(props.todoId)}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddItemForm callBack={addTaskHandler}/>
        <ul>
            {mapped}
        </ul>
        <div>
            <TodoListButton variant={buttonName === 'all' ? 'contained' : 'outlined'} name={'All'}
                            callBack={() => changeFilterHandler('all')}/>
            <TodoListButton variant={buttonName === 'active' ? 'contained' : 'outlined'} name={'Active'}
                            callBack={() => changeFilterHandler('active')}/>
            <TodoListButton variant={buttonName === 'completed' ? 'contained' : 'outlined'} name={'Completed'}
                            callBack={() => changeFilterHandler('completed')}/>
        </div>
    </div>
}
