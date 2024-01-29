import {v1} from 'uuid';
import {AddTodoListACType, RemoveTodoListACType, SetTodolistsACType} from './TodolistReducer';
import {TaskPriorities, tasksApi, TaskStatuses, TaskType} from '../api/tasks-api';
import {Dispatch} from 'redux';

export type TasksDomainType = {
    [key: string] : TaskType[]
}

const initialState: TasksDomainType = {}

export const tasksReducer = (state: TasksDomainType = initialState, action: TasksReducerType): TasksDomainType => {
    switch (action.type) {
        case 'ADD-TASK': {
            const newTask: TaskType = action.payload.task
            return {...state, [action.payload.task.todoListId]: [newTask, ...state[action.payload.task.todoListId]]}
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
            return {...state, [action.payload.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.payload.todoId]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.payload.todolists.forEach(el => stateCopy[el.id] = [])
            return stateCopy
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.payload.todolistId] = action.payload.tasks
            return stateCopy
        }
        default:
            return state
    }
}

export type TasksReducerType = addTaskACType | removeTaskACType | changeStatusACType | updateTaskACType | AddTodoListACType | RemoveTodoListACType | SetTodolistsACType | setTasksACType

type addTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        payload: {task}
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

type setTasksACType = ReturnType<typeof setTasksAC>

export const setTasksAC = (todolistId: string, tasks: TaskType[])=> {
    return {
        type: 'SET-TASKS',
        payload: {todolistId, tasks}
    } as const
}


export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksApi.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(todolistId, res.data.items))
            })
    }
}

export const deleteTaskTC =(todoId: string, tId: string)=> {
    return (dispatch: Dispatch) => {
        tasksApi.deleteTasks(todoId, tId)
            .then(()=> {
                dispatch(removeTaskAC(todoId, tId))
            })
    }
}

export const addTaskTC =(todoId: string, title: string)=> {
    return (dispatch: Dispatch) => {
        tasksApi.createTasks(todoId, title)
            .then((res)=> {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}