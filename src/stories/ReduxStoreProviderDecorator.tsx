import React from 'react';
import {Provider} from 'react-redux';
import {AppRootState, store} from '../reducers/store';
import {combineReducers, legacy_createStore} from 'redux';
import {todolistID1, todolistID2, todolistReducer} from '../reducers/TodolistReducer';
import {tasksReducer} from '../reducers/TasksReducer';
import {v1} from 'uuid';

export const rootReducer = combineReducers({
    todoLists: todolistReducer,
    tasks: tasksReducer
})

const initialState = {
    todoLists: [
        {id: todolistID1, title: 'Who is admin', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        [todolistID1]: [
            {id: v1(), title: 'Svetlana', isDone: true},
            {id: v1(), title: 'Oleg', isDone: true},
            {id: v1(), title: 'Basik', isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: 'Toilet paper', isDone: true},
            {id: v1(), title: 'Duck for bath', isDone: false},
            {id: v1(), title: 'Vodka', isDone: false}
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialState as AppRootState)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}