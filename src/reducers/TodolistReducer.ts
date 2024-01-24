import {v1} from 'uuid';
import {TodolistsType} from '../api/todolists-api';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsDomainType = TodolistsType & {
    filter: FilterValuesType
}

const initialState: TodolistsDomainType[] = []

export const todolistReducer = (state: TodolistsDomainType[] = initialState, action: TodolistReducerType): TodolistsDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todoId)
        }
        case 'ADD-TODOLIST': {
            const newTodoList: TodolistsDomainType = {
                id: action.payload.todoId,
                title: action.payload.title,
                filter: 'all',
                addedDate: '',
                order: 0
            };
            return [newTodoList, ...state]
        }
        case 'CHANGE-FILTER': {
            return state.map(el => el.id === action.payload.todoId ? {...el, filter: action.payload.value} : el)
        }
        case 'UPDATE-TITLE': {
            return state.map(t => t.id === action.payload.todoId ? {...t, title: action.payload.newTitle} : t)
        }
        case 'SET-TODOLISTS': {
            return action.payload.todolists.map(el=>({...el, filter: "all"}))
        }
        default:
            return state
    }
}

type TodolistReducerType = RemoveTodoListACType | AddTodoListACType |
                            ChangeFilterACType | UpdateTodolistTitleACType |
                            SetTodolistsACType

export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todoId}
    } as const
}

export type AddTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {title, todoId: v1()}
    } as const
}

type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todoId: string, value: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {todoId, value}
    } as const
}

type UpdateTodolistTitleACType = ReturnType<typeof updateTodolistTitleAC>
export const updateTodolistTitleAC = (todoId: string, newTitle: string) => {
    return {
        type: 'UPDATE-TITLE',
        payload: {todoId, newTitle}
    } as const
}

type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export const setTodolistsAC = (todolists: TodolistsType[]) => {
    return {
        type: 'SET-TODOLISTS',
        payload: {todolists}
    } as const
}
