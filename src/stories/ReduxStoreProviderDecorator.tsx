import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers} from 'redux';
import {todolistReducer} from '../features/TodolistsList/Todolists';
import {v1} from 'uuid';
import {loginReducer} from '../features/Login';
import {configureStore} from '@reduxjs/toolkit';
import {appReducer} from '../app';
import {tasksReducer} from '../features/TodolistsList/Todolist/Tasks';
import {AppRootState, RootReducerType} from '../common/utils/types';
import {TaskPriorities, TaskStatuses} from '../api/types';

export const rootReducer: RootReducerType = combineReducers({
    todoLists: todolistReducer,
    tasks: tasksReducer,
    app: appReducer,
    login: loginReducer,
})

export const todolistID1 = v1()
export const todolistID2 = v1()

const initialState: AppRootState = {
    todoLists: [
        {id: todolistID1, title: 'Who is admin', filter: 'all', addedDate: '', order: 0, entityStatus: 'loading'},
        {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 1, entityStatus: 'idle'}
    ],
    tasks: {
        [todolistID1]: [
            {id: v1(), title: 'Svetlana', status: TaskStatuses.New, addedDate: '', deadline: '', order: 0, startDate: '', description: '', priority: TaskPriorities.Low, todoListId: todolistID1},
            {id: v1(), title: 'Oleg', status: TaskStatuses.New, addedDate: '', deadline: '', order: 0, startDate: '', description: '', priority: TaskPriorities.Low, todoListId: todolistID1},
            {id: v1(), title: 'Basik', status: TaskStatuses.New, addedDate: '', deadline: '', order: 0, startDate: '', description: '', priority: TaskPriorities.Low, todoListId: todolistID1}
        ],
        [todolistID2]: [
            {id: v1(), title: 'Toilet paper', status: TaskStatuses.New, addedDate: '', deadline: '', order: 0, startDate: '', description: '', priority: TaskPriorities.Low, todoListId: todolistID2},
            {id: v1(), title: 'Duck for bath', status: TaskStatuses.New, addedDate: '', deadline: '', order: 0, startDate: '', description: '', priority: TaskPriorities.Low, todoListId: todolistID2},
            {id: v1(), title: 'Vodka', status: TaskStatuses.New, addedDate: '', deadline: '', order: 0, startDate: '', description: '', priority: TaskPriorities.Low, todoListId: todolistID2}
        ]
    },
    app: {
        status: 'succeeded',
        error: null,
        isInitialised: true
    },
    login: {
        isAuthorised: true
    }
}

export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialState
})

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>}