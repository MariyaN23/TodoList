import {setAppStatusAC} from '../../app/app-reducer';
import {authApi, LoginParamsType} from '../../api/auth-api';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FieldErrorType} from '../../api/todolists-api';
import {clearTasksAndTodolistsAC} from '../../common/actions/common.actions';
import {handleServerAppError, handleServerNetworkError} from '../../common/utils';

const initialState = {
    isAuthorised: false,
}

export const loginFormSendingTC = createAsyncThunk<undefined, LoginParamsType,
    { rejectValue: { errors: string[], fieldsErrors?: FieldErrorType[] } }>('login/loginFormSending',
    async (data, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const response = await authApi.login(data)
        if (response.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(dispatch, response.data.messages)
            return rejectWithValue({errors: response.data.messages, fieldsErrors: response.data.fieldsErrors})
        }
    } catch (error: any) {
        handleServerNetworkError(dispatch, error)
        return rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})

export const logoutTC = createAsyncThunk('login/logout', async (arg, {dispatch, rejectWithValue, })=>{
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const response = await authApi.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            dispatch(clearTasksAndTodolistsAC())
        } else {
            handleServerAppError(dispatch, response.data.messages)
            return rejectWithValue({})
        }
    } catch (error: any) {
        handleServerNetworkError(dispatch, error.message)
        return rejectWithValue({})
    }
})

const slice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setIsAuthorisedAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isAuthorised = action.payload.value
        }
    },
    extraReducers: builder => {
        builder.addCase(loginFormSendingTC.fulfilled, (state) => {
            state.isAuthorised = true
        })
            .addCase(logoutTC.fulfilled, (state) => {
                state.isAuthorised = false
            })
    }
})

export const loginReducer = slice.reducer
export const {setIsAuthorisedAC} = slice.actions