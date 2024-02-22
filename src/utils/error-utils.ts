import {AppReducerType, setAppErrorAC, setAppStatusAC} from '../app/app-reducer';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootState} from '../app/store';
import {AddTaskACType} from '../features/TodolistsList/TasksReducer';

export const handleServerAppError =(dispatch: ThunkDispatch<AppRootState, unknown, AddTaskACType | AppReducerType>, errorMessages: string[])=> {
    if (errorMessages.length) {
        dispatch(setAppErrorAC(errorMessages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError =(dispatch: ThunkDispatch<AppRootState, unknown, AddTaskACType | AppReducerType>, errorMessage: string)=> {
    dispatch(setAppErrorAC(errorMessage ? errorMessage : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}