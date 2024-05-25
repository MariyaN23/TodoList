import React from 'react';
import s from '../Todolist.module.css';
import {SuperCheckbox} from '../../../../components/SuperCheckbox';
import {EditableSpan} from '../../../../components/EditableSpan';
import {TodoListButton} from '../../../../components/TodoListButton';
import {TaskStatuses, TaskType} from '../../../../api/tasks-api';

type TaskPropsType = {
    removeTask: (tId: string)=>void
    updateTask: (tId: string, newTitle: string)=>void
    changeIsDone: (tId: string, checked: boolean)=>void
    t: TaskType
}

export const Task: React.FC<TaskPropsType> = React.memo((props) => {

    return <li key={props.t.id} className={props.t.status===TaskStatuses.Completed ? s.isDone : ''} >
        <SuperCheckbox status={props.t.status} callback={(checked) => props.changeIsDone(props.t.id, checked)}/>
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