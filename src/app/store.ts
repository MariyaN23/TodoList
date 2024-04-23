import {combineReducers} from 'redux';
import {tasksReducer} from '../features/TodolistsList/TasksReducer';
import {todolistReducer} from '../features/TodolistsList/TodolistReducer';
import {appReducer} from './app-reducer';
import {loginReducer} from '../features/Login/LoginReducer';
import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';

export type AppRootState = ReturnType<RootReducerType>
export type RootReducerType = typeof rootReducer

export const rootReducer = combineReducers({
    todoLists: todolistReducer,
    tasks: tasksReducer,
    app: appReducer,
    login: loginReducer,
})

export const store = configureStore({
    reducer: rootReducer
})

type AppDispatchType = typeof store.dispatch
export const useAppDispatch = ()=> useDispatch<AppDispatchType>()

// @ts-ignore
window.store = store