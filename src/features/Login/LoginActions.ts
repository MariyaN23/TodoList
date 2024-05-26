import {createAsyncThunk} from '@reduxjs/toolkit';
import {authApi} from '../../api/auth-api';
import {setAppStatus} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../common/utils';
import {clearTasksAndTodolists} from '../../common/actions/common.actions';
import {FieldErrorType, LoginParamsType} from '../../api/types';

export const loginFormSending = createAsyncThunk<undefined, LoginParamsType,
    { rejectValue: { errors: string[], fieldsErrors?: FieldErrorType[] } }>('login/loginFormSending',
    async (data: LoginParamsType, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({status: 'loading'}))
        try {
            const response = await authApi.login(data)
            if (response.data.resultCode === 0) {
                dispatch(setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(dispatch, response.data.messages)
                return rejectWithValue({errors: response.data.messages, fieldsErrors: response.data.fieldsErrors})
            }
        } catch (error: any) {
            handleServerNetworkError(dispatch, error)
            return rejectWithValue({errors: [error.message], fieldsErrors: undefined})
        }
    })

export const logout = createAsyncThunk('login/logout', async (arg, {dispatch, rejectWithValue, })=>{
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const response = await authApi.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(clearTasksAndTodolists())
        } else {
            handleServerAppError(dispatch, response.data.messages)
            return rejectWithValue({})
        }
    } catch (error: any) {
        handleServerNetworkError(dispatch, error.message)
        return rejectWithValue({})
    }
})