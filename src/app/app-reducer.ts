import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {initialiseApp} from './AppActions';

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

export const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setAppStatus(state, action: PayloadAction<{status: StatusType}>) {
            state.status = action.payload.status
        },
        setAppError(state, action: PayloadAction<{error: string | null}>) {
            state.error = action.payload.error
        },
    },
    extraReducers: builder => {
        builder.addCase(initialiseApp.fulfilled, (state)=> {
            state.isInitialised = true
        })
    }
})

export const {setAppStatus, setAppError} = slice.actions