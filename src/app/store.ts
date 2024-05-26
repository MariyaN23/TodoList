import {loginReducer} from '../features/Login';
import {combineReducers} from 'redux';
import {tasksReducer, todolistReducer} from '../features/TodolistsList';
import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {appReducer} from './';

export type AppRootState = ReturnType<RootReducerType>
export type RootReducerType = typeof rootReducer

export const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    tasks: tasksReducer,
    todoLists: todolistReducer,
})

export const store = configureStore({
    reducer: rootReducer
})

type AppDispatchType = typeof store.dispatch
export const useAppDispatch = ()=> useDispatch<AppDispatchType>()

// @ts-ignore
window.store = store