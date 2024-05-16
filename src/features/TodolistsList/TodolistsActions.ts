import {createAsyncThunk} from '@reduxjs/toolkit';
import {setAppErrorAC, setAppStatusAC} from '../../app/app-reducer';
import {todolistsApi} from '../../api/todolists-api';
import {fetchTasks} from './TasksActions';
import {handleServerNetworkError} from '../../common/utils';
import {changeTodolistEntityStatus} from './TodolistReducer';

export const fetchTodolists = createAsyncThunk('todoLists/fetchTodolists', async (arg, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const response = await todolistsApi.getTodolists()
        dispatch(setAppStatusAC({status: 'succeeded'}))
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
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        dispatch(changeTodolistEntityStatus({todoId: param.id, entityStatus: 'loading'}))
        await todolistsApi.deleteTodolists(param.id)
        dispatch(setAppStatusAC({status: 'succeeded'}))
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
    dispatch(setAppStatusAC({status: 'loading'}))
    const response = await todolistsApi.createTodolists(param.title)
    if (response.data.resultCode === 0) {
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolist: response.data.data.item}
    } else {
        if (response.data.messages.length) {
            dispatch(setAppErrorAC({error: response.data.messages[0]}))
        } else {
            dispatch(setAppErrorAC({error: 'Some error occurred'}))
        }
        dispatch(setAppStatusAC({status: 'failed'}))
        return rejectWithValue(null)
    }
})
export const updateTodolistTitle = createAsyncThunk('todoLists/updateTodolistTitle', async (param: {
    id: string,
    title: string
}, {rejectWithValue}) => {
    try {
        await todolistsApi.updateTodolists(param.id, param.title)
        return {todoId: param.id, newTitle: param.title}
    } catch (error: any) {
        return rejectWithValue(null)
    }
})