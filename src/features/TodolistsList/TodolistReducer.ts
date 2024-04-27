import {todolistsApi, TodolistsType} from '../../api/todolists-api';
import {setAppErrorAC, setAppStatusAC, StatusType} from '../../app/app-reducer';
import {handleServerNetworkError} from '../../utils/error-utils';
import {fetchTasksTC} from './TasksReducer';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearTasksAndTodolistsAC} from '../../common/actions/common.actions';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsDomainType = TodolistsType & {
    filter: FilterValuesType
    entityStatus: StatusType
}

const initialState: TodolistsDomainType[] = []

export const fetchTodolistsTC = createAsyncThunk('todoLists/fetchTodolists', async (arg, {dispatch, rejectWithValue})=> {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const response = await todolistsApi.getTodolists()
        dispatch(setAppStatusAC({status: 'succeeded'}))
        response.data.forEach((todolist)=> dispatch(fetchTasksTC(todolist.id)))
        return {todolists: response.data}
    } catch (error: any) {
        handleServerNetworkError(dispatch, error.message)
        return rejectWithValue(null)
    }
})

export const removeTodolistTC = createAsyncThunk('todoLists/removeTodolist', async (param: {id: string}, {dispatch, rejectWithValue})=> {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        dispatch(changeTodolistEntityStatusAC({todoId: param.id, entityStatus: 'loading'}))
        await todolistsApi.deleteTodolists(param.id)
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todoId: param.id}
    } catch (error: any) {
        handleServerNetworkError(dispatch, error.message)
        return rejectWithValue(null)
    }
})

export const addTodolistTC = createAsyncThunk('todoLists/addTodolist', async (param: {title: string}, {dispatch, rejectWithValue})=> {
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

export const updateTodolistTitleTC = createAsyncThunk('todoLists/updateTodolistTitle', async (param: {id: string, title: string}, {rejectWithValue})=> {
    try {
        await todolistsApi.updateTodolists(param.id, param.title)
        return {todoId: param.id, newTitle: param.title}
    } catch (error: any) {
        return rejectWithValue(null)
    }
})

const slice = createSlice({
    name: "todoLists",
    initialState,
    reducers: {
        changeFilterAC(state, action: PayloadAction<{todoId: string, value: FilterValuesType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoId)
            if (index > -1) {
                state[index].filter = action.payload.value
            }
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{todoId: string, entityStatus: StatusType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoId)
            if (index > -1) {
                state[index].entityStatus = action.payload.entityStatus
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action)=> {
            return action.payload.todolists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        })
            .addCase(removeTodolistTC.fulfilled, (state, action)=> {
                const index = state.findIndex(tl => tl.id === action.payload.todoId)
                if (index > -1) {
                    state.splice(index, 1)
                }
            })
            .addCase(addTodolistTC.fulfilled, (state, action)=> {
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
            })
            .addCase(updateTodolistTitleTC.fulfilled, (state,action)=> {
                const index = state.findIndex(tl => tl.id === action.payload.todoId)
                if (index > -1) {
                    state[index].title = action.payload.newTitle
                }
            })
            .addCase(clearTasksAndTodolistsAC, ()=> {
                return []
            })
    }
})

export const todolistReducer = slice.reducer
export const {changeTodolistEntityStatusAC,
    changeFilterAC} = slice.actions