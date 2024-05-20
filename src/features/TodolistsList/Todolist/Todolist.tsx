import React from 'react';
import {TodoListButton} from '../../../components/TodoListButton';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Task} from './Task/Task';
import {useTasks} from '../../../components/hooks/useTasks';
import {TodolistsDomainType} from '../TodolistReducer';
import {useActions} from '../../../components/hooks/useActions';
import {todolistsActions} from '../index';

type PropsType = {
    todolist: TodolistsDomainType
    demo?: boolean
}

export const Todolist: React.FC<PropsType> = React.memo(function ({demo = false, ...props}) {
    const {
        changeFilter,
        removeTodolist,
        updateTodolistTitle
    } = useActions(todolistsActions)

    const {updateTodolistTitleHandler,
        addTaskHandler,
        tasksForTodolist,
        updateTaskHandler,
        removeTaskHandler,
        changeIsDoneHandler,
        buttonName,
        changeFilterHandler,
        } = useTasks(props.todolist.id, changeFilter, props.todolist.filter, updateTodolistTitle)

    return <div>
        <h3><EditableSpan title={props.todolist.title}
                          callback={updateTodolistTitleHandler}
                          disabled={props.todolist.entityStatus === 'loading'}
        />
            <IconButton aria-label="delete"
                        disabled={props.todolist.entityStatus === 'loading'}
                        onClick={() => removeTodolist({id: props.todolist.id})}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddItemForm callBack={addTaskHandler} disabled={props.todolist.entityStatus === 'loading'}/>
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

