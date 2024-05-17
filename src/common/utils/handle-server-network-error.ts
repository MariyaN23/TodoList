import {setAppError, setAppStatus} from '../../app/app-reducer';
import {Dispatch} from '@reduxjs/toolkit';

export const handleServerNetworkError =(dispatch: Dispatch, errorMessage: string)=> {
    dispatch(setAppError({error: errorMessage ? errorMessage : 'Some error occurred'}))
    dispatch(setAppStatus({status: 'failed'}))
}