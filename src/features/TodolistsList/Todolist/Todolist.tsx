import React from 'react';
import {TodoListButton} from '../../../components/TodoListButton';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Task} from './Task/Task';
import {useTasks} from '../../../components/hooks/useTasks';
import {TodolistsDomainType} from '../Todolists/TodolistReducer';
import {todolistsActions} from '../Todolists';
import Paper from '@mui/material/Paper';
import {useActions} from '../../../common/utils/redux-utils';

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

    return <Paper elevation={3}
                  style={{position: "relative", padding: '10px'}}>
        <IconButton aria-label="delete"
                            disabled={props.todolist.entityStatus === 'loading'}
                            style={{position: "absolute", top: "5px", right: "5px"}}
                            onClick={() => removeTodolist({id: props.todolist.id})}>
        <DeleteIcon/>
    </IconButton>
        <h3 style={{maxWidth: "240px"}}><EditableSpan title={props.todolist.title}
                          callback={updateTodolistTitleHandler}
                          disabled={props.todolist.entityStatus === 'loading'}
        />
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
        {!tasksForTodolist.length && <div style={{padding: "10px", color: "gray"}}>No tasks</div>}
        <div>
            <TodoListButton variant={buttonName === 'all' ? 'contained' : 'outlined'} name={'All'}
                            callBack={() => changeFilterHandler('all')}/>
            <TodoListButton variant={buttonName === 'active' ? 'contained' : 'outlined'} name={'Active'}
                            callBack={() => changeFilterHandler('active')}/>
            <TodoListButton variant={buttonName === 'completed' ? 'contained' : 'outlined'} name={'Completed'}
                            callBack={() => changeFilterHandler('completed')}/>
        </div>
    </Paper>
})

