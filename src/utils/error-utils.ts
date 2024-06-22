import {AppReducerType, setAppErrorAC, setAppStatusAC} from '../app/app-reducer';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootState} from '../app/store';
import {AddTaskACType} from '../features/TodolistsList/TasksReducer';

export const handleServerAppError =(put: ThunkDispatch<AppRootState, unknown, AddTaskACType | AppReducerType>, errorMessages: string[])=> {
    if (errorMessages.length) {
        put(setAppErrorAC(errorMessages[0]))
    } else {
        put(setAppErrorAC('Some error occurred'))
    }
    put(setAppStatusAC('failed'))
}

export const handleServerNetworkError =(put: ThunkDispatch<AppRootState, unknown, AddTaskACType | AppReducerType>, errorMessage: string)=> {
    put(setAppErrorAC(errorMessage ? errorMessage : 'Some error occurred'))
    put(setAppStatusAC('failed'))
}