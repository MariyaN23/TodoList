import {tasksApi, TaskType} from '../../api/tasks-api';
import {AppRootState} from '../../app/store';
import {ThunkDispatch} from 'redux-thunk';
import {setAppStatusAC} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {Action, createAsyncThunk, createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {addTodoListAC, clearTodolistsDataAC, removeTodoListAC, setTodolistsAC} from './TodolistReducer';

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

const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTaskAC(state, action: PayloadAction<{task: TaskType}>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{newTask: TaskType}>) {
            const index = state[action.payload.newTask.todoListId].findIndex(el => el.id === action.payload.newTask.id)
            if (index > -1) {
                state[action.payload.newTask.todoListId][index] = action.payload.newTask
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(addTodoListAC, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(removeTodoListAC, (state, action) => {
                delete state[action.payload.todoId]
            })
            .addCase(setTodolistsAC, (state, action) => {
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
    }
})

export const tasksReducer = slice.reducer
export const {addTaskAC,
    updateTaskAC} = slice.actions

export const addTaskTC = (todoId: string, title: string) =>
    async (dispatch: ThunkDispatch<AppRootState, unknown, Action>) => {
    dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const response = await tasksApi.createTasks(todoId, title)
            if (response.data.resultCode === 0) {
                dispatch(addTaskAC({task: response.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(dispatch, response.data.messages)
            }
        } catch (error: any) {
            handleServerNetworkError(dispatch, error.message)
        }
}

type UpdateDomainTaskType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todolistId: string, taskId: string, model: UpdateDomainTaskType) =>
    async (dispatch: ThunkDispatch<AppRootState, unknown, Action>,
           getState: () => AppRootState)=> {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('Task not found in state')
            return
        }
        const newTask = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...model
        }
        try {
            const response = await tasksApi.updateTasks(todolistId, taskId, newTask)
            if (response.data.resultCode === 0) {
                dispatch(updateTaskAC({newTask: response.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(dispatch, response.data.messages)
            }
        } catch (error: any) {
            handleServerNetworkError(dispatch, error.message)
        }
    }