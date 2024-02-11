import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {tasksReducer, TasksReducerType} from '../features/TodolistsList/TasksReducer';
import {todolistReducer, TodolistReducerType} from '../features/TodolistsList/TodolistReducer';
import {thunk, ThunkAction} from 'redux-thunk';

export type AppRootState = ReturnType<typeof rootReducer>
export type AppActionsType = TasksReducerType | TodolistReducerType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>

export const rootReducer = combineReducers({
    todoLists: todolistReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store