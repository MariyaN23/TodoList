import {setAppErrorAC, setAppStatusAC} from '../../app/app-reducer';
import {Dispatch} from '@reduxjs/toolkit';

export const handleServerNetworkError =(dispatch: Dispatch, errorMessage: string)=> {
    dispatch(setAppErrorAC({error: errorMessage ? errorMessage : 'Some error occurred'}))
    dispatch(setAppStatusAC({status: 'failed'}))
}