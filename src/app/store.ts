import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {tasksReducer, TasksReducerType} from '../features/TodolistsList/TasksReducer';
import {todolistReducer, TodolistReducerType} from '../features/TodolistsList/TodolistReducer';
import {thunk, ThunkAction} from 'redux-thunk';
import {appReducer, AppReducerType} from './app-reducer';
import {loginReducer, LoginReducerType} from '../features/Login/LoginReducer';

export type AppRootState = ReturnType<typeof rootReducer>
export type AppActionsType = TasksReducerType | TodolistReducerType | AppReducerType | LoginReducerType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>

export const rootReducer = combineReducers({
    todoLists: todolistReducer,
    tasks: tasksReducer,
    app: appReducer,
    login: loginReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store