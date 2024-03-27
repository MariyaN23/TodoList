import {combineReducers} from 'redux';
import {tasksReducer, TasksReducerType} from '../features/TodolistsList/TasksReducer';
import {todolistReducer, TodolistReducerType} from '../features/TodolistsList/TodolistReducer';
import {ThunkAction} from 'redux-thunk';
import {appReducer, AppReducerType} from './app-reducer';
import {loginReducer, LoginReducerType} from '../features/Login/LoginReducer';
import {configureStore} from '@reduxjs/toolkit';

export type AppRootState = ReturnType<typeof store.getState>
export type AppActionsType = TasksReducerType | TodolistReducerType | AppReducerType | LoginReducerType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>

export const rootReducer = combineReducers({
    todoLists: todolistReducer,
    tasks: tasksReducer,
    app: appReducer,
    login: loginReducer,
})

//export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export const store = configureStore({
    reducer: rootReducer
})


// @ts-ignore
window.store = store