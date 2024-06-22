import {authApi} from '../api/auth-api';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import {setIsAuthorisedAC, setIsAuthorisedACType} from '../features/Login/LoginReducer';
import {put, call, takeEvery} from 'redux-saga/effects'

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

export const appReducer = (state: any = initialState, action: AppReducerType): AppDomainType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALISED':
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
    ({type: 'APP/SET-STATUS', status} as const)

export type setAppErrorACType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: string | null) =>
    ({type: 'APP/SET-ERROR', error} as const)

type setAppInitialisedACType = ReturnType<typeof setAppInitialisedAC>
const setAppInitialisedAC = (value: boolean) =>
    ({type: 'APP/SET-INITIALISED', value} as const)

export function* appWatcherSaga(){
    yield takeEvery('APP/INITIALIZE-APP', initialiseAppWorkerSaga)
}

export function* initialiseAppWorkerSaga(): any {
    try {
        const response = yield call(authApi.me)
        if (response.data.resultCode === 0) {
            yield put(setIsAuthorisedAC(true))
        } else {
            handleServerAppError(put, response.data.messages)
        }
    } catch (error: any) {
        handleServerNetworkError(put, error.message)
    }
    yield put(setAppInitialisedAC(true))
}

export const initialiseApp =()=> ({type: 'APP/INITIALIZE-APP'})

/*
export const initialiseAppTC = () =>
    async (dispatch: ThunkDispatch<AppRootState, unknown, setAppInitialisedACType | setIsAuthorisedACType>) => {
        try {
            const response = await authApi.me()
            if (response.data.resultCode === 0) {
                dispatch(setIsAuthorisedAC(true))
            } else {
                handleServerAppError(dispatch, response.data.messages)
            }
        } catch (error: any) {
            handleServerNetworkError(dispatch, error.message)
        }
        dispatch(setAppInitialisedAC(true))
    }*/
