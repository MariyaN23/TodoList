import {AddTodoListACType, ClearTodolistsDataACType, RemoveTodoListACType, SetTodolistsACType} from './TodolistReducer';
import {ResponseTasksType, tasksApi, TaskType} from '../../api/tasks-api';
import {AppRootState} from '../../app/store';
import {ThunkDispatch} from 'redux-thunk';
import {AppReducerType, setAppStatusAC, setAppStatusACType} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {put, call, takeEvery} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';
import {ResponseType} from '../../api/todolists-api';

export type TasksDomainType = {
    [key: string]: TaskType[]
}

const initialState: TasksDomainType = {}

export const tasksReducer = (state: TasksDomainType = initialState, action: TasksReducerType): TasksDomainType => {
    switch (action.type) {
        case 'TASKS/ADD-TASK':
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            }
        case 'TASKS/REMOVE-TASK':
            return {
                ...state, [action.payload.todoId]: state[action.payload.todoId]
                    .filter(t => t.id !== action.payload.taskId)
            }
        case 'TASKS/UPDATE-TASK':
            return {
                ...state, [action.payload.todoListId]: state[action.payload.todoListId]
                    .map(t => t.id === action.payload.id ? action.payload : t)
            }
        case 'TODOLIST/ADD-TODOLIST' :
            return {...state, [action.payload.id]: []}
        case 'TODOLIST/REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.payload.todoId]
            return stateCopy
        }
        case 'TODOLIST/SET-TODOLISTS': {
            const stateCopy = {...state}
            action.payload.forEach(el => stateCopy[el.id] = [])
            return stateCopy
        }
        case 'TASKS/SET-TASKS':
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        case 'TODOLIST/CLEAR-TODOLISTS-DATA':
            return {}
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
    | ClearTodolistsDataACType

export type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (task: TaskType) =>
    ({type: 'TASKS/ADD-TASK', payload: {task}} as const)

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoId: string, taskId: string) =>
    ({type: 'TASKS/REMOVE-TASK', payload: {todoId, taskId}} as const)

type UpdateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (newTask: TaskType) =>
    ({type: 'TASKS/UPDATE-TASK', payload: newTask} as const)

type SetTasksACType = ReturnType<typeof setTasksAC>
export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
    ({type: 'TASKS/SET-TASKS', payload: {todolistId, tasks}} as const)



export function* tasksWatcherSaga() {
    yield takeEvery('TASKS/FETCH-TASKS', fetchTasksWorkerSaga)
    yield takeEvery('TASKS/DELETE-TASK', deleteTaskWorkerSaga)
}

export function* fetchTasksWorkerSaga(action: ReturnType<typeof fetchTasks>) {
    yield put(setAppStatusAC('loading'))
    const response: AxiosResponse<ResponseTasksType> = yield call(tasksApi.getTasks, action.todolistId)
    yield put(setTasksAC(action.todolistId, response.data.items))
    yield put(setAppStatusAC('succeeded'))
}
export const fetchTasks = (todolistId: string) => ({type: 'TASKS/FETCH-TASKS', todolistId})

export function* deleteTaskWorkerSaga(action: ReturnType<typeof deleteTask>) {
    yield put(setAppStatusAC('loading'))
    const response: AxiosResponse<ResponseType> = yield call(tasksApi.deleteTasks, action.todoId, action.tId)
    yield put(removeTaskAC(action.todoId, action.tId))
    yield put(setAppStatusAC('succeeded'))
}
export const deleteTask =(todoId: string, tId: string)=> ({type: 'TASKS/DELETE-TASK', todoId, tId})

export const addTaskTC = (todoId: string, title: string) =>
    async (dispatch: ThunkDispatch<AppRootState, unknown, AddTaskACType | AppReducerType>) => {
        dispatch(setAppStatusAC('loading'))
        try {
            const response = await tasksApi.createTasks(todoId, title)
            if (response.data.resultCode === 0) {
                dispatch(addTaskAC(response.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, response.data.messages)
            }
        } catch (error: any) {
            handleServerNetworkError(dispatch, error.message)
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

/*export function* updateTaskWorkerSaga(todolistId: string, taskId: string, model: UpdateDomainTaskType) {
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
    try {
        const response = yield call(tasksApi.updateTasks(todolistId, taskId, newTask))
        if (response.data.resultCode === 0) {
            dispatch(updateTaskAC(response.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch, response.data.messages)
        }
    } catch (error: any) {
        handleServerNetworkError(dispatch, error.message)
    }
}*/

export const updateTaskTC = (todolistId: string, taskId: string, model: UpdateDomainTaskType) =>
    async (dispatch: ThunkDispatch<AppRootState, unknown, UpdateTaskACType | AppReducerType>,
           getState: () => AppRootState) => {
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
        try {
            const response = await tasksApi.updateTasks(todolistId, taskId, newTask)
            if (response.data.resultCode === 0) {
                dispatch(updateTaskAC(response.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, response.data.messages)
            }
        } catch (error: any) {
            handleServerNetworkError(dispatch, error.message)
        }
    }