import {FilterValuesType, TodolistsType} from '../components/App/App';
import {v1} from 'uuid';

export const todolistID1 = v1()
export const todolistID2 = v1()

const initialState: TodolistsType[]  = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'}
]

export const todolistReducer = (state: TodolistsType[] = initialState, action: TodolistReducerType): TodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todoId)
        }
        case 'ADD-TODOLIST': {
            const newTodoList: TodolistsType = {id: action.payload.todoId, title: action.payload.title, filter: 'all'};
            return [newTodoList, ...state]
        }
        case 'CHANGE-FILTER': {
            return state.map(el => el.id === action.payload.todoId ? {...el, filter: action.payload.value} : el)
        }
        case 'UPDATE-TITLE': {
            return state.map(t => t.id === action.payload.todoId ? {...t, title: action.payload.newTitle} : t)
        }
        default:
            return state
    }
}

type TodolistReducerType = RemoveTodoListACType | AddTodoListACType | ChangeFilterACType | UpdateTodolistTitleACType

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
        payload: {title , todoId: v1()}
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

