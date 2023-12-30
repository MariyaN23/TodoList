import React from 'react';
import s from '../Todolist/Todolist.module.css';
import {SuperCheckbox} from '../SuperCheckbox';
import {EditableSpan} from '../EditableSpan';
import {TodoListButton} from '../TodoListButton';
import {TaskType} from '../Todolist/Todolist';

type TaskPropsType = {
    removeTask: (tId: string)=>void
    updateTask: (tId: string, newTitle: string)=>void
    changeIsDone: (tId: string, checked: boolean)=>void
    t: TaskType
}

export const Task = React.memo((props: TaskPropsType) => {

    return <li key={props.t.id} className={props.t.isDone ? s.isDone : ''}>
        <SuperCheckbox isDone={props.t.isDone} callback={(checked) => props.changeIsDone(props.t.id, checked)}/>
        <EditableSpan title={props.t.title} callback={(newTitle) => props.updateTask(props.t.id, newTitle)}/>
        <TodoListButton name={'x'}
                        callBack={() => props.removeTask(props.t.id)}
                        style={{
                            maxWidth: '30px',
                            maxHeight: '30px',
                            minWidth: '30px',
                            minHeight: '30px'
                        }}
                        variant={'contained'}/>
    </li>
})