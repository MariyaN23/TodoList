import {authApi} from '../api/auth-api';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {setIsAuthorisedAC} from '../features/Login/LoginReducer';

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
        setAppInitialisedAC(state, action: PayloadAction<{isInitialised: boolean}>) {
            state.isInitialised = action.payload.isInitialised
        }
    }
})

export const appReducer = slice.reducer
export const {setAppStatusAC, setAppErrorAC, setAppInitialisedAC} = slice.actions

export const initialiseAppTC = () =>
    async (dispatch: Dispatch) => {
        try {
            const response = await authApi.me()
            if (response.data.resultCode === 0) {
                dispatch(setIsAuthorisedAC({value: true}))
            } else {
                handleServerAppError(dispatch, response.data.messages)
            }
        } catch (error: any) {
            handleServerNetworkError(dispatch, error.message)
        }
        dispatch(setAppInitialisedAC({isInitialised: true}))
    }