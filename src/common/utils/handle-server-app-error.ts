import {Dispatch} from '@reduxjs/toolkit';
import {appActions} from '../../app';

export const handleServerAppError =(dispatch: Dispatch, errorMessages: string[])=> {
    if (errorMessages.length) {
        dispatch(appActions.setAppError({error: errorMessages[0]}))
    } else {
        dispatch(appActions.setAppError({error: 'Some error occurred'}))
    }
    dispatch(appActions.setAppStatus({status: 'failed'}))
}