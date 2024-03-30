import {setAppErrorAC, setAppStatusAC} from '../app/app-reducer';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootState} from '../app/store';
import {Action} from '@reduxjs/toolkit';

export const handleServerAppError =(dispatch: ThunkDispatch<AppRootState, unknown, Action>, errorMessages: string[])=> {
    if (errorMessages.length) {
        dispatch(setAppErrorAC({error: errorMessages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkError =(dispatch: ThunkDispatch<AppRootState, unknown, Action>, errorMessage: string)=> {
    dispatch(setAppErrorAC({error: errorMessage ? errorMessage : 'Some error occurred'}))
    dispatch(setAppStatusAC({status: 'failed'}))
}