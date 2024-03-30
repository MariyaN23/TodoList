import {todolistsApi, TodolistsType} from '../../api/todolists-api';
import {AppRootState} from '../../app/store';
import {ThunkDispatch} from 'redux-thunk';
import {setAppErrorAC, setAppStatusAC, StatusType} from '../../app/app-reducer';
import {handleServerNetworkError} from '../../utils/error-utils';
import {fetchTasksTC} from './TasksReducer';
import {Action, createSlice, PayloadAction} from '@reduxjs/toolkit';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsDomainType = TodolistsType & {
    filter: FilterValuesType
    entityStatus: StatusType
}

const initialState: TodolistsDomainType[] = []

const slice = createSlice({
    name: "todoLists",
    initialState,
    reducers: {
        removeTodoListAC(state, action: PayloadAction<{todoId: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodoListAC(state, action: PayloadAction<{todolist: TodolistsType}>) {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeFilterAC(state, action: PayloadAction<{todoId: string, value: FilterValuesType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoId)
            if (index > -1) {
                state[index].filter = action.payload.value
            }
        },
        updateTodolistTitleAC(state, action: PayloadAction<{todoId: string, newTitle: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoId)
                state[index].title = action.payload.newTitle
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{todoId: string, entityStatus: StatusType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoId)
                state[index].entityStatus = action.payload.entityStatus
        },
        setTodolistsAC(state, action: PayloadAction<{todolists: TodolistsType[]}>) {
            return action.payload.todolists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        },
        clearTodolistsDataAC(state, action) {
            return []
        },
    }
})

export const todolistsReducer = slice.reducer
export const {removeTodoListAC, addTodoListAC,
    setTodolistsAC, changeTodolistEntityStatusAC,
    changeFilterAC, clearTodolistsDataAC,
    updateTodolistTitleAC} = slice.actions

export const fetchTodolistsTC = () =>
    async (dispatch: ThunkDispatch<AppRootState, unknown, Action>) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const response = await todolistsApi.getTodolists()
            dispatch(setTodolistsAC(response.data))
            dispatch(setAppStatusAC({status: 'succeeded'}))
            response.data.forEach((todolist)=> dispatch(fetchTasksTC(todolist.id)))
        } catch (error: any) {
            handleServerNetworkError(dispatch, error.message)
        }
}

export const removeTodolistTC = (id: string) =>
    async (dispatch: ThunkDispatch<AppRootState, unknown, Action>) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeTodolistEntityStatusAC(id, 'loading'))
        await todolistsApi.deleteTodolists(id)
        dispatch(removeTodoListAC(id))
        dispatch(setAppStatusAC({status: 'succeeded'}))
}

export const addTodolistTC = (title: string) =>
    async (dispatch: ThunkDispatch<AppRootState, unknown, Action>) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        const response = await todolistsApi.createTodolists(title)
        if (response.data.resultCode === 0) {
            dispatch(addTodoListAC(response.data.data.item))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            if (response.data.messages.length) {
                dispatch(setAppErrorAC({error: response.data.messages[0]}))
            } else {
                dispatch(setAppErrorAC({error: 'Some error occurred'}))
            }
            dispatch(setAppStatusAC({status: 'failed'}))
        }
}

export const updateTodolistTitleTC = (id: string, title: string)=> async (dispatch: ThunkDispatch<AppRootState, unknown, UpdateTodolistTitleACType>) => {
    await todolistsApi.updateTodolists(id, title)
    dispatch(updateTodolistTitleAC(id, title))
}