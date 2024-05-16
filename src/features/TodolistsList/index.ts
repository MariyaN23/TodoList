import * as tasksActions from './TasksActions'
import * as todolistsAsyncActions from './TodolistsActions'
import {slice} from './TodolistReducer'


const todolistsActions = {...todolistsAsyncActions, ...slice.actions}
export {
    tasksActions,
    todolistsActions
}