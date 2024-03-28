import {AppRootState, AppThunk} from '../../app/store';
import {ThunkDispatch} from 'redux-thunk';
import {setAppStatusAC, setAppStatusACType} from '../../app/app-reducer';
import {authApi, LoginParamsType} from '../../api/auth-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {clearTodolistsDataAC, ClearTodolistsDataACType} from '../TodolistsList/TodolistReducer';
import {createSlice, Dispatch} from '@reduxjs/toolkit';

const initialState = {
    isAuthorised: false,
}

const slice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setIsAuthorisedAC(state, action) {
            state.isAuthorised = action.payload.value
        }
    }
})

export const loginReducer = slice.reducer
const {setIsAuthorisedAC} = slice.actions

export const loginFormSendingTC = (data: LoginParamsType) =>
    async (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        try {
            const response = await authApi.login(data)
            if (response.data.resultCode === 0) {
                dispatch(setIsAuthorisedAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, response.data.messages)
            }
        } catch (error: any) {
            handleServerNetworkError(dispatch, error.message)
        }
    }

export const logoutTC = () =>
    async (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        try {
            const response = await authApi.logout()
            if (response.data.resultCode === 0) {
                dispatch(setIsAuthorisedAC(false))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(clearTodolistsDataAC())
            } else {
                handleServerAppError(dispatch, response.data.messages)
            }
        } catch (error: any) {
            handleServerNetworkError(dispatch, error.message)
        }
    }