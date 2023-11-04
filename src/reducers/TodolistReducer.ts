import {FilterValuesType, TodolistsType} from '../App';

export const TodolistReducer = (state: TodolistsType[], action: TodolistReducerType): TodolistsType[] => {
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

type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todoId}
    } as const
}

type AddTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (title: string, todoId: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {title, todoId}
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

