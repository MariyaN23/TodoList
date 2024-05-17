import {createAsyncThunk} from '@reduxjs/toolkit';
import {authApi} from '../api/auth-api';
import {setIsAuthorisedAC} from '../features/Login/LoginReducer';
import {handleServerAppError, handleServerNetworkError} from '../common/utils';

export const initialiseApp = createAsyncThunk('app/initialiseApp', async (arg, {dispatch, rejectWithValue})=> {
    try {
        const response = await authApi.me()
        if (response.data.resultCode === 0) {
            dispatch(setIsAuthorisedAC({value: true}))
        } else {
            handleServerAppError(dispatch, response.data.messages)
            return rejectWithValue(null)
        }
    } catch (error: any) {
        handleServerNetworkError(dispatch, error.message)
        return rejectWithValue(null)
    }
})