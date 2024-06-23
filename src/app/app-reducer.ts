import {authApi, AuthMeDataType, MeResponseType} from '../api/auth-api';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import {setIsAuthorisedAC} from '../features/Login/LoginReducer';
import {put, call, takeEvery} from 'redux-saga/effects'
import {AxiosResponse} from 'axios';
import {ResponseType} from '../api/todolists-api';

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppDomainType = {
    status: StatusType
    error: string | null
    isInitialised: boolean
}

const initialState: AppDomainType = {
    status: 'idle',
    error: null,
    isInitialised: false,
}

//AC
const SET_STATUS = 'APP/SET-STATUS'
const SET_ERROR = 'APP/SET-ERROR'
const SET_INITIALISED = 'APP/SET-INITIALISED'

//saga
const INITIALIZE_APP = 'APP/INITIALIZE-APP'

export const appReducer = (state: any = initialState, action: AppReducerType): AppDomainType => {
    switch (action.type) {
        case SET_STATUS:
            return {...state, status: action.status}
        case SET_ERROR:
            return {...state, error: action.error}
        case SET_INITIALISED:
            return {...state, isInitialised: action.value}
        default:
            return state
    }
}

export type AppReducerType =
    | setAppStatusACType
    | setAppErrorACType
    | setAppInitialisedACType

export type setAppStatusACType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status: StatusType) =>
    ({type: SET_STATUS, status} as const)

export type setAppErrorACType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: string | null) =>
    ({type: SET_ERROR, error} as const)

export type setAppInitialisedACType = ReturnType<typeof setAppInitialisedAC>
export const setAppInitialisedAC = (value: boolean) =>
    ({type: SET_INITIALISED, value} as const)

export function* appWatcherSaga(){
    yield takeEvery(INITIALIZE_APP, initialiseAppWorkerSaga)
}

export function* initialiseAppWorkerSaga() {
    try {
        const data: MeResponseType = yield call(authApi.me)
        if (data.resultCode === 0) {
            yield put(setIsAuthorisedAC(true))
        } else {
            handleServerAppError(put, data.messages)
        }
    } catch (error: any) {
        handleServerNetworkError(put, error.message)
    }
    yield put(setAppInitialisedAC(true))
}
export const initialiseApp =()=> ({type: INITIALIZE_APP})