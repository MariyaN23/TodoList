import React from 'react';
import {Provider} from 'react-redux';
import {AppRootState, store} from '../reducers/store';
import {combineReducers, legacy_createStore} from 'redux';
import {todolistID1, todolistID2, todolistReducer} from '../reducers/TodolistReducer';
import {tasksReducer} from '../reducers/TasksReducer';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from '../api/tasks-api';

export const rootReducer = combineReducers({
    todoLists: todolistReducer,
    tasks: tasksReducer
})

const initialState = {
    todoLists: [
        {id: todolistID1, title: 'Who is admin', filter: 'all', addedDate: '', order: 0},
        {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 1}
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
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialState as AppRootState)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}