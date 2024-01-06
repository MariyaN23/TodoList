import {action} from '@storybook/addon-actions'
import React from 'react';
import {Task} from './Task';
import {TaskPriorities, TaskStatuses} from '../../api/tasks-api';

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
              t={{id: '1',
                  title: 'CSS',
                  status: TaskStatuses.New,
                  addedDate: '',
                  deadline: '',
                  order: 0,
                  startDate: '',
                  description: '',
                  priority: TaskPriorities.Low,
                  todoListId: "1"}}/>
        <Task changeIsDone={changeIsDoneCallBack}
              removeTask={removeTaskCallBack}
              updateTask={updateTaskCallBack}
              t={{id: '2', title: 'HTML',
                  status: TaskStatuses.New,
                  addedDate: '',
                  deadline: '',
                  order: 0,
                  startDate: '',
                  description: '',
                  priority: TaskPriorities.Low,
                  todoListId: "1"}}/>
        </>
}