import {combineReducers} from 'redux';
import {tasksReducer} from '../features/TodolistsList/TasksReducer';
import {todolistReducer} from '../features/TodolistsList/TodolistReducer';
import {appReducer} from './app-reducer';
import {loginReducer} from '../features/Login/LoginReducer';
import {configureStore} from '@reduxjs/toolkit';

export type AppRootState = ReturnType<typeof store.getState>

export const rootReducer = combineReducers({
    todoLists: todolistReducer,
    tasks: tasksReducer,
    app: appReducer,
    login: loginReducer,
})

export const store = configureStore({
    reducer: rootReducer
})

// @ts-ignore
window.store = store