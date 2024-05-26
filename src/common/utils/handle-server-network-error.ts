import {appActions} from '../../app';
import {Dispatch} from '@reduxjs/toolkit';

export const handleServerNetworkError =(dispatch: Dispatch, errorMessage: string)=> {
    debugger
    dispatch(appActions.setAppError({error: errorMessage ? errorMessage : 'Some error occurred'}))
    dispatch(appActions.setAppStatus({status: 'failed'}))
}