import React from 'react';
import {Provider} from 'react-redux';
import {AppRootState} from '../app/store';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {todolistReducer} from '../features/TodolistsList/TodolistReducer';
import {tasksReducer} from '../features/TodolistsList/TasksReducer';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from '../api/tasks-api';
import {appReducer} from '../app/app-reducer';
import {thunk} from 'redux-thunk';

export const rootReducer = combineReducers({
    todoLists: todolistReducer,
    tasks: tasksReducer,
    app: appReducer
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
        status: 'idle',
        error: null,
        isInitialised: false
    },
    login: {
        isAuthorised: false,
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialState as AppRootState, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}