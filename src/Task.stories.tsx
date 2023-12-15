import {action} from '@storybook/addon-actions'
import React from 'react';
import {Task} from './Task';

export default {
    title: 'Task',
    component: Task
}

const updateTaskCallBack = action("Title updated")
const removeTaskCallBack = action("Task removed")
const changeIsDoneCallBack = action("Status changed")


export const TaskExample = ()=> {
    return <>
        <Task changeIsDone={changeIsDoneCallBack}
              removeTask={removeTaskCallBack}
              updateTask={updateTaskCallBack}
              t={{id: '1', title: 'CSS', isDone: true}}/>
        <Task changeIsDone={changeIsDoneCallBack}
              removeTask={removeTaskCallBack}
              updateTask={updateTaskCallBack}
              t={{id: '2', title: 'HTML', isDone: false}}/>
        </>
}