import * as tasksActions from './TasksActions'
import * as todolistsAsyncActions from './TodolistsActions'
import {slice} from './TodolistReducer'
import {TodolistsList} from './TodolistsList'


const todolistsActions = {...todolistsAsyncActions, ...slice.actions}
export {
    tasksActions,
    todolistsActions,
    TodolistsList,
}