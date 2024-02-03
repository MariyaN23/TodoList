import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from '../features/TodolistsList/TasksReducer';
import {todolistReducer} from '../features/TodolistsList/TodolistReducer';
import {thunk} from 'redux-thunk';

export type AppRootState = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
    todoLists: todolistReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store