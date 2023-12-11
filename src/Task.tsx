import {AnyAction, Dispatch} from 'redux';
import React, {useCallback} from 'react';
import {changeIsDoneAC, removeTaskAC, updateTaskAC} from './reducers/TasksReducer';
import s from './Todolist.module.css';
import {SuperCheckbox} from './components/SuperCheckbox';
import {EditableSpan} from './components/EditableSpan';
import {TodoListButton} from './components/TodoListButton';
import {TaskType} from './Todolist';

type TaskPropsType = {
    dispatch: Dispatch<AnyAction>
    t: TaskType
    todoId: string
}
export const Task = React.memo((props: TaskPropsType) => {

    const changeIsDoneHandler = useCallback((tId: string, checked: boolean) => {
        props.dispatch(changeIsDoneAC(props.todoId, tId, checked))
    }, [props.dispatch, props.todoId])

    const removeTaskHandler = useCallback((tId: string) => props.dispatch(removeTaskAC(props.todoId, tId)), [props.dispatch, props.todoId])

    const updateTaskHandler = useCallback((tId: string, newTitle: string) => props.dispatch(updateTaskAC(props.todoId, tId, newTitle)), [props.dispatch, props.todoId])

    return <li key={props.t.id} className={props.t.isDone ? s.isDone : ''}>
        <SuperCheckbox isDone={props.t.isDone} callback={(checked) => changeIsDoneHandler(props.t.id, checked)}/>
        <EditableSpan title={props.t.title} callback={(newTitle) => updateTaskHandler(props.t.id, newTitle)}/>
        <TodoListButton name={'x'}
                        callBack={() => removeTaskHandler(props.t.id)}
                        style={{
                            maxWidth: '30px',
                            maxHeight: '30px',
                            minWidth: '30px',
                            minHeight: '30px'
                        }}
                        variant={'contained'}/>
    </li>
})