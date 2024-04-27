import {tasksApi, TaskType} from '../../api/tasks-api';
import {AppRootState} from '../../app/store';
import {setAppStatusAC} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {addTodolistTC, clearTodolistsDataAC, fetchTodolistsTC, removeTodolistTC} from './TodolistReducer';

export type TasksDomainType = {
    [key: string]: TaskType[]
}

const initialState: TasksDomainType = {}

export const fetchTasksTC = createAsyncThunk("tasks/fetchTasks", async (todolistId: string, thunkAPI)=> {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const response = await tasksApi.getTasks(todolistId)
    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    return {todolistId, tasks: response.data.items}
})

export const deleteTaskTC = createAsyncThunk("tasks/deleteTask", async (param: {todoId: string, tId: string}, thunkAPI)=> {
    await tasksApi.deleteTasks(param.todoId, param.tId)
    return {todoId: param.todoId, taskId: param.tId}
})

export const addTaskTC = createAsyncThunk('tasks/addTask', async (params: {todoId: string, title: string}, {dispatch, rejectWithValue})=> {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const response = await tasksApi.createTasks(params.todoId, params.title)
        if (response.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {task: response.data.data.item}
        } else {
            handleServerAppError(dispatch, response.data.messages)
            return rejectWithValue(null)
        }
    } catch (error: any) {
        handleServerNetworkError(dispatch, error.message)
        return rejectWithValue(null)
    }
})

type UpdateDomainTaskType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

export const updateTaskTC = createAsyncThunk('tasks/updateTask', async (param: {
    todolistId: string,
    taskId: string,
    model: UpdateDomainTaskType
}, {dispatch, getState, rejectWithValue})=> {
    const state = getState() as AppRootState
    const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
    if (!task) {
        return rejectWithValue('Task not found in state')
    }
    const newTask = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...param.model
    }
    try {
        const response = await tasksApi.updateTasks(param.todolistId, param.taskId, newTask)
        if (response.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {newTask: response.data.data.item}
        } else {
            handleServerAppError(dispatch, response.data.messages)
            return rejectWithValue(null)
        }
    } catch (error: any) {
        handleServerNetworkError(dispatch, error.message)
        return rejectWithValue(null)
    }
})

const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(addTodolistTC.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(removeTodolistTC.fulfilled, (state, action) => {
                delete state[action.payload.todoId]
            })
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
                action.payload.todolists.forEach(el => state[el.id] = [])
            })
            .addCase(clearTodolistsDataAC, () => {
                return {}
            })
            .addCase(fetchTasksTC.fulfilled, (state, action)=> {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(deleteTaskTC.fulfilled, (state, action)=> {
                const index = state[action.payload.todoId].findIndex(el => el.id === action.payload.taskId)
                if (index > -1) {
                    state[action.payload.todoId].splice(index, 1)
                }
            })
            .addCase(addTaskTC.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            })
            .addCase(updateTaskTC.fulfilled, (state, action)=> {
                const index = state[action.payload.newTask.todoListId].findIndex(el => el.id === action.payload.newTask.id)
                if (index > -1) {
                    state[action.payload.newTask.todoListId][index] = action.payload.newTask
                }
            })
    }
})

export const tasksReducer = slice.reducer