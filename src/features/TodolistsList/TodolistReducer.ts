import {todolistsApi, TodolistsType} from '../../api/todolists-api';
import {Dispatch} from 'redux';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsDomainType = TodolistsType & {
    filter: FilterValuesType
}

const initialState: TodolistsDomainType[] = []

export const todolistReducer = (state: TodolistsDomainType[] = initialState, action: TodolistReducerType):
    TodolistsDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.payload.todoId)
        case 'ADD-TODOLIST':
            return [{...action.payload, filter: 'all',}, ...state]
        case 'CHANGE-FILTER':
            return state.map(el => el.id === action.payload.todoId ? {...el, filter: action.payload.value} : el)
        case 'UPDATE-TITLE':
            return state.map(t => t.id === action.payload.todoId ? {...t, title: action.payload.newTitle} : t)
        case 'SET-TODOLISTS':
            return action.payload.map(el => ({...el, filter: 'all'}))
        default:
            return state
    }
}

type TodolistReducerType =
    | RemoveTodoListACType
    | AddTodoListACType
    | SetTodolistsACType
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof updateTodolistTitleAC>

export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoId: string) =>
    ({type: 'REMOVE-TODOLIST', payload: {todoId}} as const)

export type AddTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (todolist: TodolistsType) =>
    ({type: 'ADD-TODOLIST', payload: todolist} as const)

export const changeFilterAC = (todoId: string, value: FilterValuesType) =>
    ({type: 'CHANGE-FILTER', payload: {todoId, value}} as const)

export const updateTodolistTitleAC = (todoId: string, newTitle: string) =>
    ({type: 'UPDATE-TITLE', payload: {todoId, newTitle}} as const)

export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export const setTodolistsAC = (todolists: TodolistsType[]) =>
    ({type: 'SET-TODOLISTS', payload: todolists} as const)

export const fetchTodolistsTC = () => (dispatch: Dispatch<TodolistReducerType>) => {
    todolistsApi.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
}

export const removeTodolistTC = (id: string) => (dispatch: Dispatch<TodolistReducerType>) => {
    todolistsApi.deleteTodolists(id)
        .then(() => {
            dispatch(removeTodoListAC(id))
        })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch<TodolistReducerType>) => {
    todolistsApi.createTodolists(title)
        .then((res) => {
            dispatch(addTodoListAC(res.data.data.item))
        })
}

export const updateTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch<TodolistReducerType>) => {
    todolistsApi.updateTodolists(id, title)
        .then(() => {
            dispatch(updateTodolistTitleAC(id, title))
        })
}