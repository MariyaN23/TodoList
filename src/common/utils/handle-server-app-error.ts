import {Dispatch} from '@reduxjs/toolkit';
import {setAppErrorAC, setAppStatusAC} from '../../app/app-reducer';

export const handleServerAppError =(dispatch: Dispatch, errorMessages: string[])=> {
    if (errorMessages.length) {
        dispatch(setAppErrorAC({error: errorMessages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}