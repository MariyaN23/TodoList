import {setAppErrorAC, setAppStatusAC} from '../app/app-reducer';
import {Dispatch} from '@reduxjs/toolkit';

export const handleServerAppError =(dispatch: Dispatch, errorMessages: string[])=> {
    if (errorMessages.length) {
        dispatch(setAppErrorAC({error: errorMessages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkError =(dispatch: Dispatch, errorMessage: string)=> {
    dispatch(setAppErrorAC({error: errorMessage ? errorMessage : 'Some error occurred'}))
    dispatch(setAppStatusAC({status: 'failed'}))
}