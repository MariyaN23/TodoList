import {
    ADD_TODOLIST,
    AddTodoListACType,
    CLEAR_TODOLISTS_DATA,
    ClearTodolistsDataACType,
    REMOVE_TODOLIST,
    RemoveTodoListACType,
    SET_TODOLISTS,
    SetTodolistsACType
} from './TodolistReducer';
import {ResponseTasksType, tasksApi, TaskType} from '../../api/tasks-api';
import {setAppStatusAC} from '../../app/app-reducer';
import {
    handleServerAppErrorSaga,
    handleServerNetworkErrorSaga
} from '../../utils/error-utils';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';
import {ResponseType} from '../../api/todolists-api';
import {AppRootState} from '../../app/store';

export type TasksDomainType = {
    [key: string]: TaskType[]
}

const initialState: TasksDomainType = {}

//AC
const ADD_TASK = 'TASKS/ADD-TASK'
const REMOVE_TASK = 'TASKS/REMOVE-TASK'
const UPDATE_TASK = 'TASKS/UPDATE-TASK'
const SET_TASKS = 'TASKS/SET-TASKS'

//saga
export const FETCH_TASKS = 'TASKS/FETCH-TASKS'
const DELETE_TASK = 'TASKS/DELETE-TASK'
export const CREATE_TASK = 'TASKS/CREATE-TASK'
export const CHANGE_TASK = 'TASKS/CHANGE-TASK'

export const tasksReducer = (state: TasksDomainType = initialState, action: TasksReducerType): TasksDomainType => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            }
        case REMOVE_TASK:
            return {
                ...state, [action.payload.todoId]: state[action.payload.todoId]
                    .filter(t => t.id !== action.payload.taskId)
            }
        case UPDATE_TASK:
            return {
                ...state, [action.payload.todoListId]: state[action.payload.todoListId]
                    .map(t => t.id === action.payload.id ? action.payload : t)
            }
        case ADD_TODOLIST:
            return {...state, [action.payload.id]: []}
        case REMOVE_TODOLIST: {
            const stateCopy = {...state}
            delete stateCopy[action.payload.todoId]
            return stateCopy
        }
        case SET_TODOLISTS: {
            const stateCopy = {...state}
            action.payload.forEach(el => stateCopy[el.id] = [])
            return stateCopy
        }
        case SET_TASKS:
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        case CLEAR_TODOLISTS_DATA:
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
    ({type: ADD_TASK, payload: {task}} as const)

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoId: string, taskId: string) =>
    ({type: REMOVE_TASK, payload: {todoId, taskId}} as const)

type UpdateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (newTask: TaskType) =>
    ({type: UPDATE_TASK, payload: newTask} as const)

type SetTasksACType = ReturnType<typeof setTasksAC>
export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
    ({type: SET_TASKS, payload: {todolistId, tasks}} as const)


export function* tasksWatcherSaga() {
    yield takeEvery(FETCH_TASKS, fetchTasksWorkerSaga)
    yield takeEvery(DELETE_TASK, deleteTaskWorkerSaga)
    yield takeEvery(CREATE_TASK, addTaskWorkerSaga)
    yield takeEvery(CHANGE_TASK, updateTaskWorkerSaga)
}

export function* fetchTasksWorkerSaga(action: ReturnType<typeof fetchTasks>) {
    yield put(setAppStatusAC('loading'))
    const data: ResponseTasksType = yield call(tasksApi.getTasks, action.todolistId)
    yield put(setTasksAC(action.todolistId, data.items))
    yield put(setAppStatusAC('succeeded'))
}
export const fetchTasks = (todolistId: string) => ({type: FETCH_TASKS, todolistId} as const)

export function* deleteTaskWorkerSaga(action: ReturnType<typeof deleteTask>) {
    yield put(setAppStatusAC('loading'))
    const response: AxiosResponse<ResponseType> = yield call(tasksApi.deleteTasks, action.todoId, action.tId)
    yield put(removeTaskAC(action.todoId, action.tId))
    yield put(setAppStatusAC('succeeded'))
}
export const deleteTask = (todoId: string, tId: string) => ({type: DELETE_TASK, todoId, tId} as const)

export function* addTaskWorkerSaga(action: ReturnType<typeof addTask>) {
    yield put(setAppStatusAC('loading'))
    try {
        const response: AxiosResponse<ResponseType<{ item: TaskType }>> =
            yield call(tasksApi.createTasks, action.todoId, action.title)
        if (response.data.resultCode === 0) {
            yield put(addTaskAC(response.data.data.item))
            yield put(setAppStatusAC('succeeded'))
        } else {
            yield* handleServerAppErrorSaga(response.data.messages)
        }
    } catch (error: any) {
        yield* handleServerNetworkErrorSaga(error.message)
    }
}
export const addTask = (todoId: string, title: string) => ({type: CREATE_TASK, todoId, title} as const)

type UpdateDomainTaskType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

export function* updateTaskWorkerSaga(action: ReturnType<typeof updateTask>) {
    const state: AppRootState  = yield select()
    const task = state.tasks[action.todolistId].find((t: any) => t.id === action.taskId)
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
        ...action.model
    }
    try {
        const response: AxiosResponse<ResponseType<{item: TaskType}>> = yield call(tasksApi.updateTasks, action.todolistId, action.taskId, newTask)
        if (response.data.resultCode === 0) {
            yield put(updateTaskAC(response.data.data.item))
            yield put(setAppStatusAC('succeeded'))
        } else {
            yield handleServerAppErrorSaga(response.data.messages)
        }
    } catch (error: any) {
        yield handleServerNetworkErrorSaga(error.message)
    }
}
export const updateTask =(todolistId: string, taskId: string, model: UpdateDomainTaskType)=> ({type: CHANGE_TASK, todolistId, taskId, model} as const)