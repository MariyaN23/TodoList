import {authApi} from '../api/auth-api';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {setIsAuthorisedAC} from '../features/Login/LoginReducer';
import {handleServerAppError, handleServerNetworkError} from '../common/utils';

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppDomainType = {
    status: StatusType
    error: string | null
    isInitialised: boolean
}

const initialState: AppDomainType = {
    status: 'idle',
    error: null,
    isInitialised: false,
}

export const initialiseAppTC = createAsyncThunk('app/initialiseApp', async (arg, {dispatch, rejectWithValue})=> {
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

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{status: StatusType}>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{error: string | null}>) {
            state.error = action.payload.error
        },
    },
    extraReducers: builder => {
        builder.addCase(initialiseAppTC.fulfilled, (state)=> {
            state.isInitialised = true
        })
    }
})

export const appReducer = slice.reducer
export const {setAppStatusAC, setAppErrorAC} = slice.actions