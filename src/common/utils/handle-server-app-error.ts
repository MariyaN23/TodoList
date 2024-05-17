import {Dispatch} from '@reduxjs/toolkit';
import {setAppError, setAppStatus} from '../../app/app-reducer';

export const handleServerAppError =(dispatch: Dispatch, errorMessages: string[])=> {
    if (errorMessages.length) {
        dispatch(setAppError({error: errorMessages[0]}))
    } else {
        dispatch(setAppError({error: 'Some error occurred'}))
    }
    dispatch(setAppStatus({status: 'failed'}))
}