import {AppRootState, AppThunk} from '../../app/store';
import {ThunkDispatch} from 'redux-thunk';
import {setAppStatusAC, setAppStatusACType} from '../../app/app-reducer';
import {authApi, LoginParamsType} from '../../api/auth-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';

export type LoginStateType = {
    isAuthorised: boolean
}

const initialState = {
    isAuthorised: false,
}

export const loginReducer =(state: LoginStateType = initialState, action: LoginReducerType): LoginStateType => {
    switch (action.type) {
        case 'login/SET-IS-AUTHORISED':
            return {...state, isAuthorised: action.payload.value}
        default: return state
    }
}

export type LoginReducerType = setIsAuthorisedACType

export type setIsAuthorisedACType = ReturnType<typeof setIsAuthorisedAC>
export const setIsAuthorisedAC =(value: boolean)=> ({type: 'login/SET-IS-AUTHORISED', payload: {value}} as const)

export const loginFormSendingTC = (data: LoginParamsType): AppThunk =>
    async (dispatch: ThunkDispatch<AppRootState, unknown, setIsAuthorisedACType | setAppStatusACType>) => {
        dispatch(setAppStatusAC('loading'))
        try {
            const response = await authApi.login(data)
            if (response.data.resultCode === 0) {
                dispatch(setIsAuthorisedAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, response.data.messages)
            }
        } catch (error: any) {
            handleServerNetworkError(dispatch, error.message)
        }
    }

export const logoutTC = (): AppThunk =>
    async (dispatch: ThunkDispatch<AppRootState, unknown, setIsAuthorisedACType | setAppStatusACType>) => {
        dispatch(setAppStatusAC('loading'))
        try {
            const response = await authApi.logout()
            if (response.data.resultCode === 0) {
                dispatch(setIsAuthorisedAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, response.data.messages)
            }
        } catch (error: any) {
            handleServerNetworkError(dispatch, error.message)
        }
    }