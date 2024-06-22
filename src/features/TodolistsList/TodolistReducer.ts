import {todolistsApi, TodolistsType} from '../../api/todolists-api';
import {AppRootState} from '../../app/store';
import {ThunkDispatch} from 'redux-thunk';
import {AppReducerType, setAppErrorAC, setAppStatusAC, setAppStatusACType, StatusType} from '../../app/app-reducer';
import {handleServerNetworkError} from '../../utils/error-utils';
import {fetchTasks, fetchTasksWorkerSaga} from './TasksReducer';
import {all, call, put, takeEvery} from 'redux-saga/effects';
import {fork} from 'child_process';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsDomainType = TodolistsType & {
    filter: FilterValuesType
    entityStatus: StatusType
}

const initialState: TodolistsDomainType[] = []

export const todolistReducer = (state: TodolistsDomainType[] = initialState, action: TodolistReducerType):
    TodolistsDomainType[] => {
    switch (action.type) {
        case 'TODOLIST/REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.payload.todoId)
        case 'TODOLIST/ADD-TODOLIST':
            return [{...action.payload, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'TODOLIST/CHANGE-FILTER':
            return state.map(el => el.id === action.payload.todoId ? {...el, filter: action.payload.value} : el)
        case 'TODOLIST/UPDATE-TITLE':
            return state.map(t => t.id === action.payload.todoId ? {...t, title: action.payload.newTitle} : t)
        case 'TODOLIST/SET-TODOLISTS':
            return action.payload.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        case 'TODOLIST/CHANGE-ENTITY-STATUS':
            return state.map(el => el.id === action.payload.todoId ? {...el, entityStatus: action.payload.entityStatus} : el)
        case 'TODOLIST/CLEAR-TODOLISTS-DATA':
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
    ({type: 'TODOLIST/REMOVE-TODOLIST', payload: {todoId}} as const)

export type AddTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (todolist: TodolistsType) =>
    ({type: 'TODOLIST/ADD-TODOLIST', payload: todolist} as const)

type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todoId: string, value: FilterValuesType) =>
    ({type: 'TODOLIST/CHANGE-FILTER', payload: {todoId, value}} as const)

type UpdateTodolistTitleACType = ReturnType<typeof updateTodolistTitleAC>
export const updateTodolistTitleAC = (todoId: string, newTitle: string) =>
    ({type: 'TODOLIST/UPDATE-TITLE', payload: {todoId, newTitle}} as const)

type ChangeTodolistEntityStatusType = ReturnType<typeof changeTodolistEntityStatusAC>
export const changeTodolistEntityStatusAC = (todoId: string, entityStatus: StatusType) =>
    ({type: 'TODOLIST/CHANGE-ENTITY-STATUS', payload: {todoId, entityStatus}} as const)

export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export const setTodolistsAC = (todolists: TodolistsType[]) =>
    ({type: 'TODOLIST/SET-TODOLISTS', payload: todolists} as const)

export type ClearTodolistsDataACType = ReturnType<typeof clearTodolistsDataAC>
export const clearTodolistsDataAC = () => ({type: 'TODOLIST/CLEAR-TODOLISTS-DATA'} as const)


export function* todolistsWatcherSaga() {
    yield takeEvery('TODOLIST/FETCH-TODOLISTS', fetchTodolistsWorkerSaga)
}

export function* fetchTodolistsWorkerSaga(): any {
        yield put(setAppStatusAC('loading'))
        try {
            const response = yield call(todolistsApi.getTodolists)
            yield put(setTodolistsAC(response.data))
            yield put(setAppStatusAC('succeeded'))
            //yield all(response.data.map((todolist: TodolistsDomainType) => call(fetchTasks(todolist.id))));
        } catch (error: any) {
            handleServerNetworkError(put, error.message)
        }
}
export const fetchTodolists =()=> ({type: 'TODOLIST/FETCH-TODOLISTS'})

export const removeTodolistTC = (id: string)=>
    async (dispatch: ThunkDispatch<AppRootState, unknown, RemoveTodoListACType | AppReducerType | ChangeTodolistEntityStatusType>) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(id, 'loading'))
        await todolistsApi.deleteTodolists(id)
        dispatch(removeTodoListAC(id))
        dispatch(setAppStatusAC('succeeded'))
}

export const addTodolistTC = (title: string)=>
    async (dispatch: ThunkDispatch<AppRootState, unknown, AddTodoListACType | AppReducerType>) => {
        dispatch(setAppStatusAC('loading'))
        const response = await todolistsApi.createTodolists(title)
        if (response.data.resultCode === 0) {
            dispatch(addTodoListAC(response.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            if (response.data.messages.length) {
                dispatch(setAppErrorAC(response.data.messages[0]))
            } else {
                dispatch(setAppErrorAC('Some error occurred'))
            }
            dispatch(setAppStatusAC('failed'))
        }
}

export const updateTodolistTitleTC = (id: string, title: string) => async (dispatch: ThunkDispatch<AppRootState, unknown, UpdateTodolistTitleACType>) => {
    await todolistsApi.updateTodolists(id, title)
    dispatch(updateTodolistTitleAC(id, title))
}