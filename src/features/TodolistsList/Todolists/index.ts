import {slice} from './TodolistReducer'
import * as todolistsAsyncActions from './TodolistsActions'


const todolistReducer = slice.reducer
const todolistsActions = {...todolistsAsyncActions, ...slice.actions}

export {
    todolistsActions,
    todolistReducer
}