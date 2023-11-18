import {combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from './TasksReducer';
import {todolistReducer} from './TodolistReducer';

export type AppRootState = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
    todoLists: todolistReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer)

// @ts-ignore
window.store = store