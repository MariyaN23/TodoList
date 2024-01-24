import {v1} from 'uuid';
import {AddTodoListACType, RemoveTodoListACType} from './TodolistReducer';
import {TaskPriorities, TaskStatuses, TaskType} from '../api/tasks-api';

export type TasksDomainType = {
    [key: string] : TaskType[]
}

const initialState: TasksDomainType = {}

export const tasksReducer = (state: TasksDomainType = initialState, action: TasksReducerType): TasksDomainType => {
    switch (action.type) {
        case 'ADD-TASK': {
            const newTask: TaskType = {id: v1(),
                title: action.payload.title,
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                order: 0,
                startDate: '',
                description: '',
                priority: TaskPriorities.Low,
                todoListId: action.payload.todoId
            }
            return {...state, [action.payload.todoId]: [newTask, ...state[action.payload.todoId]]}
        }
        case 'REMOVE-TASK': {
            return {...state, [action.payload.todoId]: state[action.payload.todoId].filter(t => t.id !== action.payload.taskId)}
        }
        case 'CHANGE-STATUS': {
            return {...state, [action.payload.todoId]: state[action.payload.todoId].map(el => el.id === action.payload.taskId ? {...el, status: action.payload.newStatus} : el)}
        }
        case 'UPDATE-TASK': {
            return {...state, [action.payload.todoId]: state[action.payload.todoId].map(t => t.id === action.payload.taskId ? {...t, title: action.payload.newTitle} : t)}
        }
        case 'ADD-TODOLIST' : {
            return {...state, [action.payload.todoId]: []}
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.payload.todoId]
            return stateCopy
        }
        default:
            return state
    }
}

export type TasksReducerType = addTaskACType | removeTaskACType | changeStatusACType | updateTaskACType | AddTodoListACType | RemoveTodoListACType

type addTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (todoId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {todoId, title}
    } as const
}

type removeTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (todoId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {todoId, taskId}
    } as const
}

type changeStatusACType = ReturnType<typeof changeStatusAC>

export const changeStatusAC = (todoId: string, taskId: string, newStatus: TaskStatuses) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {todoId, taskId, newStatus}
    } as const
}

type updateTaskACType = ReturnType<typeof updateTaskAC>

export const updateTaskAC = (todoId: string, taskId: string, newTitle: string) => {
    return {
        type: 'UPDATE-TASK',
        payload: {todoId, taskId, newTitle}
    } as const
}