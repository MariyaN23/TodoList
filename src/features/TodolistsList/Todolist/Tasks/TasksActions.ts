import {createAsyncThunk} from '@reduxjs/toolkit';
import {setAppStatus} from '../../../../app/app-reducer';
import {tasksApi} from '../../../../api/tasks-api';
import {handleServerAppError, handleServerNetworkError} from '../../../../common/utils';
import {AppRootState} from '../../../../common/utils/types';
import {FieldErrorType, TaskType} from '../../../../api/types';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    const response = await tasksApi.getTasks(todolistId)
    thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
    return {todolistId, tasks: response.data.items}
})
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (param: {
    todoId: string,
    tId: string
}, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const response = await tasksApi.deleteTasks(param.todoId, param.tId)
        if (response.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {todoId: param.todoId, taskId: param.tId}
        } else {
            handleServerAppError(thunkAPI.dispatch, response.data.messages)
            return thunkAPI.rejectWithValue({errors: response.data.messages, fieldsErrors: response.data.fieldsErrors})
        }
    } catch (error: any) {
        handleServerNetworkError(thunkAPI.dispatch, error.message)
        return thunkAPI.rejectWithValue(null)
    }
})
export const addTask = createAsyncThunk<{task: TaskType}, { todoId: string, title: string }, { rejectValue: { errors: string[], fieldsErrors?: FieldErrorType[] } }>('tasks/addTask', async (params, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const response = await tasksApi.createTasks(params.todoId, params.title)
        if (response.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            return {task: response.data.data.item}
        } else {
            handleServerAppError(dispatch, response.data.messages)
            return rejectWithValue({errors: response.data.messages, fieldsErrors: response.data.fieldsErrors})
        }
    } catch (error: any) {
        handleServerNetworkError(dispatch, error.message)
        return rejectWithValue({errors: [error.message], fieldsErrors: undefined})
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
export const updateTask = createAsyncThunk('tasks/updateTask', async (param: {
    todolistId: string,
    taskId: string,
    model: UpdateDomainTaskType
}, {dispatch, getState, rejectWithValue}) => {
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
            dispatch(setAppStatus({status: 'succeeded'}))
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