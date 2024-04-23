import {setAppStatusAC} from '../../app/app-reducer';
import {authApi, LoginParamsType} from '../../api/auth-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {clearTodolistsDataAC} from '../TodolistsList/TodolistReducer';
import {createAsyncThunk, createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    isAuthorised: false,
}

export const loginFormSendingTC1 = (data: LoginParamsType) =>
    async (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const response = await authApi.login(data)
            if (response.data.resultCode === 0) {
                dispatch(setIsAuthorisedAC({value: true}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(dispatch, response.data.messages)
            }
        } catch (error: any) {
            handleServerNetworkError(dispatch, error.message)
        }
    }

export const loginFormSendingTC = createAsyncThunk('login/loginFormSending', async (data: LoginParamsType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const response = await authApi.login(data)
        if (response.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {value: true}
        } else {
            handleServerAppError(thunkAPI.dispatch, response.data.messages)
            return thunkAPI.rejectWithValue({errors: response.data.messages, fieldsErrors: response.data.fieldsErrors})
        }
    } catch (error: any) {
        handleServerNetworkError(thunkAPI.dispatch, error)
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})


const slice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setIsAuthorisedAC(state, action: PayloadAction<{value: boolean}>) {
            state.isAuthorised = action.payload.value
        }
    },
    extraReducers: builder => {
        builder.addCase(loginFormSendingTC.fulfilled, (state, action) => {
            state.isAuthorised = action.payload.value
        })
    }
})

export const loginReducer = slice.reducer
export const {setIsAuthorisedAC} = slice.actions


export const logoutTC = () =>
    async (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const response = await authApi.logout()
            if (response.data.resultCode === 0) {
                dispatch(setIsAuthorisedAC({value: false}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
                dispatch(clearTodolistsDataAC())
            } else {
                handleServerAppError(dispatch, response.data.messages)
            }
        } catch (error: any) {
            handleServerNetworkError(dispatch, error.message)
        }
    }