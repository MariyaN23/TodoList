import {AddTodoListACType, RemoveTodoListACType, SetTodolistsACType} from './TodolistReducer';
import {tasksApi, TaskType} from '../../api/tasks-api';
import {AppRootState, AppThunk} from '../../app/store';
import {ThunkDispatch} from 'redux-thunk';
import {AppReducerType, setErrorAC, setStatusAC, setStatusACType} from '../../app/app-reducer';

export type TasksDomainType = {
    [key: string]: TaskType[]
}

const initialState: TasksDomainType = {}

export const tasksReducer = (state: TasksDomainType = initialState, action: TasksReducerType): TasksDomainType => {
    switch (action.type) {
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            }
        case 'REMOVE-TASK':
            return {
                ...state, [action.payload.todoId]: state[action.payload.todoId]
                    .filter(t => t.id !== action.payload.taskId)
            }
        case 'UPDATE-TASK':
            return {
                ...state, [action.payload.todoListId]: state[action.payload.todoListId]
                    .map(t => t.id === action.payload.id ? action.payload : t)
            }
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
    | AddTaskACType
    | RemoveTaskACType
    | UpdateTaskACType
    | SetTasksACType
    | AddTodoListACType
    | RemoveTodoListACType
    | SetTodolistsACType

type AddTaskACType= ReturnType<typeof addTaskAC>
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', payload: {task}} as const)

type RemoveTaskACType= ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoId: string, taskId: string) =>
    ({type: 'REMOVE-TASK', payload: {todoId, taskId}} as const)

type UpdateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (newTask: TaskType) =>
    ({type: 'UPDATE-TASK', payload: newTask} as const)

type SetTasksACType = ReturnType<typeof setTasksAC>
export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
    ({type: 'SET-TASKS', payload: {todolistId, tasks}} as const)

export const fetchTasksTC = (todolistId: string): AppThunk =>
    async (dispatch: ThunkDispatch<AppRootState, unknown, SetTasksACType | setStatusACType>) => {
        dispatch(setStatusAC('loading'))
        const response = await tasksApi.getTasks(todolistId)
        dispatch(setTasksAC(todolistId, response.data.items))
        dispatch(setStatusAC('succeeded'))
}

export const deleteTaskTC = (todoId: string, tId: string): AppThunk =>
    async (dispatch: ThunkDispatch<AppRootState, unknown, RemoveTaskACType>) => {
    await tasksApi.deleteTasks(todoId, tId)
    dispatch(removeTaskAC(todoId, tId))
}

export const addTaskTC = (todoId: string, title: string): AppThunk =>
    async (dispatch: ThunkDispatch<AppRootState, unknown, AddTaskACType | AppReducerType>) => {
    dispatch(setStatusAC('loading'))
    const response = await tasksApi.createTasks(todoId, title)
    if (response.data.resultCode === 0) {
        dispatch(addTaskAC(response.data.data.item))
        dispatch(setStatusAC('succeeded'))
    } else {
        if (response.data.messages.length) {
            dispatch(setErrorAC(response.data.messages[0]))
        } else {
            dispatch(setErrorAC('Some error occurred'))
        }
        dispatch(setStatusAC('failed'))
    }
}

type UpdateDomainTaskType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todolistId: string, taskId: string, model: UpdateDomainTaskType): AppThunk =>
    async (dispatch: ThunkDispatch<AppRootState, unknown, UpdateTaskACType>,
           getState: () => AppRootState)=> {
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
        const response = await tasksApi.updateTasks(todolistId, taskId, newTask)
        dispatch(updateTaskAC(response.data.data.item))
    }