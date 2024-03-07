import {AppRootState, AppThunk} from '../../app/store';
import {ThunkDispatch} from 'redux-thunk';
import {setAppStatusAC, setAppStatusACType} from '../../app/app-reducer';
import {tasksApi} from '../../api/tasks-api';
import {setTasksAC, updateTaskAC} from '../TodolistsList/TasksReducer';
import {authApi, LoginParamsType} from '../../api/auth-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';

type LoginStateType = {
    email: string
    password: string
    rememberMe: boolean
    isAuthorised: boolean
}

const initialState = {
    email: '',
    password: '',
    rememberMe: false,
    isAuthorised: false,
}

export const loginReducer =(state: LoginStateType = initialState, action: LoginReducerType): LoginStateType => {
    switch (action.type) {
        default: return state
    }
}

export type LoginReducerType = any

export const loginFormSendingTC = (data: LoginParamsType): AppThunk =>
    async (dispatch: ThunkDispatch<AppRootState, unknown, any | setAppStatusACType>) => {
        dispatch(setAppStatusAC('loading'))
        try {
            const response = await authApi.login(data)
            if (response.data.resultCode === 0) {
                alert('succeeded')
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, response.data.messages)
            }
        } catch (error: any) {
            handleServerNetworkError(dispatch, error.message)
        }
    }