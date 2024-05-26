import {slice as todolistSlice} from './TodolistReducer'
import {slice as tasksSlice} from './TasksReducer'
import * as tasksActions from './TasksActions'
import * as todolistsAsyncActions from './TodolistsActions'
import {TodolistsList} from './TodolistsList'

const tasksReducer = tasksSlice.reducer
const todolistReducer = todolistSlice.reducer
const todolistsActions = {...todolistsAsyncActions, ...todolistSlice.actions}

export {
    tasksActions,
    todolistsActions,
    TodolistsList,
    tasksReducer,
    todolistReducer
}