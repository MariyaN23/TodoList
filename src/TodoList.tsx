import React, {useCallback, useState} from 'react';
import {FilterValuesType} from './App';
import {TodoListButton} from './components/TodoListButton';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './reducers/store';
import {addTaskAC, changeIsDoneAC, removeTaskAC, updateTaskAC} from './reducers/TasksReducer';
import {Task} from './Task';

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

export const Todolist = React.memo(function (props: PropsType) {
    console.log('Todolist is called')
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[props.todoId])

    const [buttonName, setButtonName] = useState('all')

    const changeFilterHandler = useCallback((filter: FilterValuesType) => {
        props.changeFilter(props.todoId, filter)
        setButtonName(filter)
    }, [props.changeFilter, props.todoId])

    let allTasksForTodolist = tasks
    let tasksForTodolist = tasks

    if (props.filter === 'active') {
        tasksForTodolist = allTasksForTodolist.filter(t => !t.isDone);
    }
    if (props.filter === 'completed') {
        tasksForTodolist = allTasksForTodolist.filter(t => t.isDone);
    }

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskAC(props.todoId, title))
    }, [dispatch, props.todoId])

    const updateTodolistTitleHandler = useCallback((newTitle: string) => {
        props.updateTodolistTitle(props.todoId, newTitle)
    }, [props.updateTodolistTitle, props.todoId])

    const removeTaskHandler = useCallback((tId: string) => dispatch(removeTaskAC(props.todoId, tId)), [dispatch, props.todoId])

    const updateTaskHandler = useCallback((tId: string, newTitle: string) => dispatch(updateTaskAC(props.todoId, tId, newTitle)), [dispatch, props.todoId])

    const changeIsDoneHandler = useCallback((tId: string, checked: boolean) => {
        dispatch(changeIsDoneAC(props.todoId, tId, checked))
    }, [dispatch, props.todoId])

    return <div>
        <h3><EditableSpan title={props.title} callback={updateTodolistTitleHandler}/>
            <IconButton aria-label="delete" onClick={() => props.removeTodoList(props.todoId)}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddItemForm callBack={addTaskHandler}/>
        <ul>
            {tasksForTodolist.map(t => <Task
                updateTask={updateTaskHandler}
                removeTask={removeTaskHandler}
                changeIsDone={changeIsDoneHandler}
                t={t}
                key={t.id}/>)}
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
})

