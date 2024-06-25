import {setAppErrorAC, setAppStatusAC} from '../app/app-reducer';
import {put} from 'redux-saga/effects';

export function* handleServerAppErrorSaga(errorMessages: string[]) {
    if (errorMessages.length) {
        yield put(setAppErrorAC(errorMessages[0]))
    } else {
        yield put(setAppErrorAC('Some error occurred'))
    }
    yield put(setAppStatusAC('failed'))
}

export function* handleServerNetworkErrorSaga(errorMessage: string) {
    yield put(setAppErrorAC(errorMessage ? errorMessage : 'Some error occurred'))
    yield put(setAppStatusAC('failed'))
}