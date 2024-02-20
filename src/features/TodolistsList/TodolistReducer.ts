import {todolistsApi, TodolistsType} from '../../api/todolists-api';
import {AppRootState, AppThunk} from '../../app/store';
import {ThunkDispatch} from 'redux-thunk';
import {AppReducerType, setAppErrorAC, setAppStatusAC, setAppStatusACType, StatusType} from '../../app/app-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsDomainType = TodolistsType & {
    filter: FilterValuesType
    entityStatus: StatusType
}

const initialState: TodolistsDomainType[] = []

export const todolistReducer = (state: TodolistsDomainType[] = initialState, action: TodolistReducerType):
    TodolistsDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.payload.todoId)
        case 'ADD-TODOLIST':
            return [{...action.payload, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-FILTER':
            return state.map(el => el.id === action.payload.todoId ? {...el, filter: action.payload.value} : el)
        case 'UPDATE-TITLE':
            return state.map(t => t.id === action.payload.todoId ? {...t, title: action.payload.newTitle} : t)
        case 'SET-TODOLISTS':
            return action.payload.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        case 'CHANGE-ENTITY-STATUS':
            return state.map(el => el.id === action.payload.todoId ? {...el, entityStatus: action.payload.entityStatus} : el)
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

export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoId: string) =>
    ({type: 'REMOVE-TODOLIST', payload: {todoId}} as const)

export type AddTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (todolist: TodolistsType) =>
    ({type: 'ADD-TODOLIST', payload: todolist} as const)

type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todoId: string, value: FilterValuesType) =>
    ({type: 'CHANGE-FILTER', payload: {todoId, value}} as const)

type UpdateTodolistTitleACType = ReturnType<typeof updateTodolistTitleAC>
export const updateTodolistTitleAC = (todoId: string, newTitle: string) =>
    ({type: 'UPDATE-TITLE', payload: {todoId, newTitle}} as const)

type ChangeTodolistEntityStatusType = ReturnType<typeof changeTodolistEntityStatusAC>
export const changeTodolistEntityStatusAC = (todoId: string, entityStatus: StatusType) =>
    ({type: 'CHANGE-ENTITY-STATUS', payload: {todoId, entityStatus}} as const)

export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export const setTodolistsAC = (todolists: TodolistsType[]) =>
    ({type: 'SET-TODOLISTS', payload: todolists} as const)

export const fetchTodolistsTC = (): AppThunk =>
    async (dispatch: ThunkDispatch<AppRootState, unknown, SetTodolistsACType | setAppStatusACType>) => {
        dispatch(setAppStatusAC('loading'))
        const response = await todolistsApi.getTodolists()
        dispatch(setTodolistsAC(response.data))
        dispatch(setAppStatusAC('succeeded'))
}

export const removeTodolistTC = (id: string): AppThunk =>
    async (dispatch: ThunkDispatch<AppRootState, unknown, RemoveTodoListACType | AppReducerType | ChangeTodolistEntityStatusType>) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(id, 'loading'))
        await todolistsApi.deleteTodolists(id)
        dispatch(removeTodoListAC(id))
        dispatch(setAppStatusAC('succeeded'))
}

export const addTodolistTC = (title: string): AppThunk =>
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

export const updateTodolistTitleTC = (id: string, title: string): AppThunk => async (dispatch: ThunkDispatch<AppRootState, unknown, UpdateTodolistTitleACType>) => {
    await todolistsApi.updateTodolists(id, title)
    dispatch(updateTodolistTitleAC(id, title))
}