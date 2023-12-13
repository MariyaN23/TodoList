import {action} from '@storybook/addon-actions'
import React from 'react';
import {Task} from './Task';
import {TasksReducerType} from './reducers/TasksReducer';

export default {
    title: 'Task',
    component: Task
}

const callBack = action("Button 'add' was pressed inside the form")


export const TaskExample = ()=> {
    return <>
        <Task dispatch={(action: TasksReducerType)=>{}}
              t={{id: '1', title: 'CSS', isDone: true}}
              todoId={'1'}/>
        <Task dispatch={(action: TasksReducerType)=>{}}
              t={{id: '2', title: 'HTML', isDone: false}}
              todoId={'2'}/>
        </>
}