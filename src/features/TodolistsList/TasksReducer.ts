import {AddTodoListACType, RemoveTodoListACType, SetTodolistsACType} from './TodolistReducer';
import {tasksApi, TaskType} from '../../api/tasks-api';
import {Dispatch} from 'redux';
import {AppRootState} from '../../app/store';

export type TasksDomainType = {
    [key: string] : TaskType[]
}

const initialState: TasksDomainType = {}

export const tasksReducer = (state: TasksDomainType = initialState, action: TasksReducerType): TasksDomainType => {
    switch (action.type) {
        case 'ADD-TASK':
            return {...state, [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]}
        case 'REMOVE-TASK':
            return {...state, [action.payload.todoId]: state[action.payload.todoId]
                    .filter(t => t.id !== action.payload.taskId)}
        case 'UPDATE-TASK':
            return {...state, [action.payload.todoListId]: state[action.payload.todoListId]
                    .map(t => t.id === action.payload.id ? action.payload : t)}
        case 'ADD-TODOLIST' :
            return {...state, [action.payload.id]: []}
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.payload.todoId]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.payload.forEach(el => stateCopy[el.id] = [])
            return stateCopy
        }
        case 'SET-TASKS':
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        default:
            return state
    }
}

export type TasksReducerType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | AddTodoListACType
    | RemoveTodoListACType
    | SetTodolistsACType

export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', payload: {task}} as const)
export const removeTaskAC = (todoId: string, taskId: string) =>
    ({type: 'REMOVE-TASK', payload: {todoId, taskId}} as const)
export const updateTaskAC = (newTask: TaskType) =>
    ({type: 'UPDATE-TASK', payload: newTask} as const)
export const setTasksAC = (todolistId: string, tasks: TaskType[])=>
    ({type: 'SET-TASKS', payload: {todolistId, tasks}}  as const)

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<TasksReducerType>) => {
    tasksApi.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
}

export const deleteTaskTC = (todoId: string, tId: string) => (dispatch: Dispatch<TasksReducerType>) => {
    tasksApi.deleteTasks(todoId, tId)
        .then(() => {
            dispatch(removeTaskAC(todoId, tId))
        })
}

export const addTaskTC = (todoId: string, title: string) => (dispatch: Dispatch<TasksReducerType>) => {
    tasksApi.createTasks(todoId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
}

type UpdateDomainTaskType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

export const updateTaskTC =(todolistId: string, taskId: string, model: UpdateDomainTaskType)=>
    (dispatch: Dispatch<TasksReducerType>, getState: ()=> AppRootState) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('Task not found in state')
            return
        }
        const newTask = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...model
        }
        tasksApi.updateTasks(todolistId, taskId, newTask)
            .then((res)=> {
                dispatch(updateTaskAC(res.data.data.item))
            })
    }