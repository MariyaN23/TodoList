import {combineReducers} from 'redux';
import {appReducer} from './index';
import {loginReducer} from '../features/Login';
import {tasksReducer} from '../features/TodolistsList/Todolist/Tasks';
import {todolistReducer} from '../features/TodolistsList/Todolists';

export const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    tasks: tasksReducer,
    todoLists: todolistReducer,
})