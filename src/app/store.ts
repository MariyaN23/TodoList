import {loginReducer} from '../features/Login';
import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import {appReducer} from './';
import {tasksReducer} from '../features/TodolistsList/Todolist/Tasks';
import {todolistReducer} from '../features/TodolistsList/Todolists';

export const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    tasks: tasksReducer,
    todoLists: todolistReducer,
})

export const store = configureStore({
    reducer: rootReducer
})

// @ts-ignore
window.store = store