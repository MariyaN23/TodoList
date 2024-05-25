import {createAsyncThunk} from '@reduxjs/toolkit';
import {setAppError, setAppStatus} from '../../app/app-reducer';
import {todolistsApi} from '../../api/todolists-api';
import {fetchTasks} from './TasksActions';
import {handleServerAppError, handleServerNetworkError} from '../../common/utils';
import {changeTodolistEntityStatus} from './TodolistReducer';

export const fetchTodolists = createAsyncThunk('todoLists/fetchTodolists', async (arg, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const response = await todolistsApi.getTodolists()
        dispatch(setAppStatus({status: 'succeeded'}))
        response.data.forEach((todolist) => dispatch(fetchTasks(todolist.id)))
        return {todolists: response.data}
    } catch (error: any) {
        handleServerNetworkError(dispatch, error.message)
        return rejectWithValue(null)
    }
})
export const removeTodolist = createAsyncThunk('todoLists/removeTodolist', async (param: { id: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        dispatch(changeTodolistEntityStatus({todoId: param.id, entityStatus: 'loading'}))
        await todolistsApi.deleteTodolists(param.id)
        dispatch(setAppStatus({status: 'succeeded'}))
        return {todoId: param.id}
    } catch (error: any) {
        handleServerNetworkError(dispatch, error.message)
        return rejectWithValue(null)
    }
})
export const addTodolist = createAsyncThunk('todoLists/addTodolist', async (param: { title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const response = await todolistsApi.createTodolists(param.title)
        if (response.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            return {todolist: response.data.data.item}
        } else {
            if (response.data.messages.length) {
                dispatch(setAppError({error: response.data.messages[0]}))
            } else {
                dispatch(setAppError({error: 'Some error occurred'}))
            }
            dispatch(setAppStatus({status: 'failed'}))
            return rejectWithValue(null)
        }
    } catch (error: any) {
        handleServerNetworkError(dispatch, error.message)
        return rejectWithValue(null)
    }
})
export const updateTodolistTitle = createAsyncThunk('todoLists/updateTodolistTitle', async (param: {
    id: string,
    title: string
}, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const response = await todolistsApi.updateTodolists(param.id, param.title)
        if (response.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            return {todoId: param.id, newTitle: param.title}
        } else {
            handleServerAppError(dispatch, response.data.messages)
            return rejectWithValue(null)
        }
    } catch (error: any) {
        handleServerNetworkError(dispatch, error.message)
        return rejectWithValue(null)
    }
})