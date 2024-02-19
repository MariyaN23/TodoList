import React, {useEffect} from 'react';
import {TodoListButton} from '../../../components/TodoListButton';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Task} from './Task/Task';
import {useTasks} from '../../../components/hooks/useTasks';
import {FilterValuesType, TodolistsDomainType} from '../TodolistReducer';

type PropsType = {
    todolist: TodolistsDomainType
    changeFilter: (todoId: string, value: FilterValuesType) => void
    removeTodoList: (todoId: string) => void
    updateTodolistTitle: (todoId: string, newTitle: string) => void
    demo?: boolean
}

export const Todolist: React.FC<PropsType> = React.memo(function ({demo = false, ...props}) {
    console.log('Todolist is called')
    const {updateTodolistTitleHandler,
        addTaskHandler,
        tasksForTodolist,
        updateTaskHandler,
        removeTaskHandler,
        changeIsDoneHandler,
        buttonName,
        changeFilterHandler,
        fetchTasksFunction} = useTasks(props.todolist.id, props.changeFilter, props.todolist.filter, props.updateTodolistTitle)
    useEffect(()=>{
        if (demo) {
            return;
        }
        fetchTasksFunction()
    }, [])
    return <div>
        <h3><EditableSpan title={props.todolist.title} callback={updateTodolistTitleHandler}/>
            <IconButton aria-label="delete" onClick={() => props.removeTodoList(props.todolist.id)}>
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

