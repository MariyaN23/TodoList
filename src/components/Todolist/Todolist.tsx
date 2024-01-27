import React, {useEffect} from 'react';
import {TodoListButton} from '../TodoListButton';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Task} from '../Task/Task';
import {useTasks} from '../hooks/useTasks';
import {FilterValuesType} from '../../reducers/TodolistReducer';

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
    const {updateTodolistTitleHandler,
        addTaskHandler,
        tasksForTodolist,
        updateTaskHandler,
        removeTaskHandler,
        changeIsDoneHandler,
        buttonName,
        changeFilterHandler,
        fetchTasksFunction} = useTasks(props.todoId, props.changeFilter, props.filter, props.updateTodolistTitle)
    useEffect(()=>{
        fetchTasksFunction()
    }, [])
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

