import {ResponseType, todolistsApi, TodolistsType} from '../../api/todolists-api';
import {setAppErrorAC, setAppStatusAC, StatusType} from '../../app/app-reducer';
import {handleServerNetworkError} from '../../utils/error-utils';
import {call, put, takeEvery} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsDomainType = TodolistsType & {
    filter: FilterValuesType
    entityStatus: StatusType
}

const initialState: TodolistsDomainType[] = []

//AC
export const REMOVE_TODOLIST = 'TODOLIST/REMOVE-TODOLIST'
export const ADD_TODOLIST = 'TODOLIST/ADD-TODOLIST'
export const SET_TODOLISTS = 'TODOLIST/SET-TODOLISTS'
export const CLEAR_TODOLISTS_DATA = 'TODOLIST/CLEAR-TODOLISTS-DATA'
const CHANGE_ENTITY_STATUS = 'TODOLIST/CHANGE-ENTITY-STATUS'
const CHANGE_FILTER = 'TODOLIST/CHANGE-FILTER'
const UPDATE_TITLE = 'TODOLIST/UPDATE-TITLE'

//saga
const FETCH_TODOLISTS = 'TODOLIST/FETCH-TODOLISTS'
const DELETE_TODOLIST = 'TODOLIST/DELETE-TODOLIST'
const CREATE_TODOLIST = 'TODOLIST/CREATE-TODOLIST'
const UPDATE_TODOLIST_TITLE = 'TODOLIST/UPDATE-TODOLIST-TITLE'

export const todolistReducer = (state: TodolistsDomainType[] = initialState, action: TodolistReducerType):
    TodolistsDomainType[] => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter(el => el.id !== action.payload.todoId)
        case ADD_TODOLIST:
            return [{...action.payload, filter: 'all', entityStatus: 'idle'}, ...state]
        case CHANGE_FILTER:
            return state.map(el => el.id === action.payload.todoId ? {...el, filter: action.payload.value} : el)
        case UPDATE_TITLE:
            return state.map(t => t.id === action.payload.todoId ? {...t, title: action.payload.newTitle} : t)
        case SET_TODOLISTS:
            return action.payload.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        case CHANGE_ENTITY_STATUS:
            return state.map(el => el.id === action.payload.todoId ? {
                ...el,
                entityStatus: action.payload.entityStatus
            } : el)
        case CLEAR_TODOLISTS_DATA:
            return []
        default:
            return state
    }
}

export type TodolistReducerType =
    | RemoveTodoListACType
    | AddTodoListACType
    | SetTodolistsACType
    | ChangeFilterACType
    | UpdateTodolistTitleACType
    | ChangeTodolistEntityStatusType
    | ClearTodolistsDataACType

export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoId: string) =>
    ({type: REMOVE_TODOLIST, payload: {todoId}} as const)

export type AddTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (todolist: TodolistsType) =>
    ({type: ADD_TODOLIST, payload: todolist} as const)

type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todoId: string, value: FilterValuesType) =>
    ({type: CHANGE_FILTER, payload: {todoId, value}} as const)

type UpdateTodolistTitleACType = ReturnType<typeof updateTodolistTitleAC>
export const updateTodolistTitleAC = (todoId: string, newTitle: string) =>
    ({type: UPDATE_TITLE, payload: {todoId, newTitle}} as const)

type ChangeTodolistEntityStatusType = ReturnType<typeof changeTodolistEntityStatusAC>
export const changeTodolistEntityStatusAC = (todoId: string, entityStatus: StatusType) =>
    ({type: CHANGE_ENTITY_STATUS, payload: {todoId, entityStatus}} as const)

export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export const setTodolistsAC = (todolists: TodolistsType[]) =>
    ({type: SET_TODOLISTS, payload: todolists} as const)

export type ClearTodolistsDataACType = ReturnType<typeof clearTodolistsDataAC>
export const clearTodolistsDataAC = () => ({type: CLEAR_TODOLISTS_DATA} as const)


export function* todolistsWatcherSaga() {
    yield takeEvery(FETCH_TODOLISTS, fetchTodolistsWorkerSaga)
    yield takeEvery(DELETE_TODOLIST, removeTodolistWorkerSaga)
    yield takeEvery(CREATE_TODOLIST, addTodolistWorkerSaga)
    yield takeEvery(UPDATE_TODOLIST_TITLE, updateTodolistTitleWorkerSaga)
}

export function* fetchTodolistsWorkerSaga() {
    yield put(setAppStatusAC('loading'))
    try {
        const response: AxiosResponse<TodolistsType[]> = yield call(todolistsApi.getTodolists)
        yield put(setTodolistsAC(response.data))
        yield put(setAppStatusAC('succeeded'))
        //yield all(response.data.map((todolist: TodolistsDomainType) => call(fetchTasks(todolist.id))));
    } catch (error: any) {
        handleServerNetworkError(put, error.message)
    }
}
export const fetchTodolists = () => ({type: FETCH_TODOLISTS})

export function* removeTodolistWorkerSaga(action: ReturnType<typeof removeTodolist>) {
    yield put(setAppStatusAC('loading'))
    yield put(changeTodolistEntityStatusAC(action.id, 'loading'))
    const response: AxiosResponse<ResponseType> = yield call(todolistsApi.deleteTodolists, action.id)
    yield put(removeTodoListAC(action.id))
    yield put(setAppStatusAC('succeeded'))
}
export const removeTodolist = (id: string) => ({type: DELETE_TODOLIST, id})

export function* addTodolistWorkerSaga(action: ReturnType<typeof addTodolist>) {
    yield put(setAppStatusAC('loading'))
    const response: AxiosResponse<ResponseType<{ item: TodolistsType }>> =
        yield call(todolistsApi.createTodolists, action.title)
    if (response.data.resultCode === 0) {
        yield put(addTodoListAC(response.data.data.item))
        yield put(setAppStatusAC('succeeded'))
    } else {
        if (response.data.messages.length) {
            yield put(setAppErrorAC(response.data.messages[0]))
        } else {
            yield put(setAppErrorAC('Some error occurred'))
        }
        yield put(setAppStatusAC('failed'))
    }
}
export const addTodolist = (title: string) => ({type: CREATE_TODOLIST, title})

export function* updateTodolistTitleWorkerSaga(action: ReturnType<typeof updateTodolisttitle>) {
    const response: AxiosResponse<ResponseType> = yield call(todolistsApi.updateTodolists, action.id, action.title)
    yield put(updateTodolistTitleAC(action.id, action.title))
}
export const updateTodolisttitle =(id: string, title: string)=> ({type:UPDATE_TODOLIST_TITLE, id, title})