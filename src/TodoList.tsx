import React, {useCallback, useState} from 'react';
import {FilterValuesType, TasksType} from './App';
import {TodoListButton} from './components/Button';
import s from './Todolist.module.css'
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {SuperCheckbox} from './components/SuperCheckbox';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './reducers/store';
import {addTaskAC, changeIsDoneAC, removeTaskAC, updateTaskAC} from './reducers/TasksReducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    changeFilter: (todoId: string, value: FilterValuesType) => void
    todoId: string
    removeTodoList: (todoId: string) => void
    updateTodolistTitle: (todoId: string, newTitle: string) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[props.todoId])

    const [buttonName, setButtonName] = useState('all')

    const changeFilterHandler = (filter: FilterValuesType) => {
        props.changeFilter(props.todoId, filter)
        setButtonName(filter)
    }

    const changeIsDoneHandler = (tId: string, checked: boolean) => {
        dispatch(changeIsDoneAC(props.todoId, tId, checked))
    }

    let allTasksForTodolist = tasks
    let tasksForTodolist = tasks

    if (props.filter === 'active') {
        tasksForTodolist = allTasksForTodolist.filter(t => !t.isDone);
    }
    if (props.filter === 'completed') {
        tasksForTodolist = allTasksForTodolist.filter(t => t.isDone);
    }

    const mapped = tasksForTodolist.map(t => {
        const removeTaskHandler = () => dispatch(removeTaskAC(props.todoId, t.id))
        const updateTaskHandler = (newTitle: string) => dispatch(updateTaskAC(props.todoId, t.id, newTitle))
        return (
            <li key={t.id} className={t.isDone ? s.isDone : ''}>
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

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskAC(props.todoId, title))
    }, [])

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
