import {AppRootState} from '../../app/store';
import {ThunkDispatch} from 'redux-thunk';
import {setAppStatusAC, setAppStatusACType} from '../../app/app-reducer';
import {authApi, LoginParamsType} from '../../api/auth-api';
import {handleServerAppErrorSaga, handleServerNetworkErrorSaga} from '../../utils/error-utils';
import {clearTodolistsDataAC, ClearTodolistsDataACType} from '../TodolistsList/TodolistReducer';

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

export const loginFormSendingTC = (data: LoginParamsType) =>
    async (dispatch: ThunkDispatch<AppRootState, unknown, setIsAuthorisedACType | setAppStatusACType>) => {
        dispatch(setAppStatusAC('loading'))
        try {
            const response = await authApi.login(data)
            if (response.data.resultCode === 0) {
                dispatch(setIsAuthorisedAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppErrorSaga(response.data.messages)
            }
        } catch (error: any) {
            handleServerNetworkErrorSaga(error.message)
        }
    }

export const logoutTC = () =>
    async (dispatch: ThunkDispatch<AppRootState, unknown, setIsAuthorisedACType | setAppStatusACType | ClearTodolistsDataACType>) => {
        dispatch(setAppStatusAC('loading'))
        try {
            const response = await authApi.logout()
            if (response.data.resultCode === 0) {
                dispatch(setIsAuthorisedAC(false))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(clearTodolistsDataAC())
            } else {
                handleServerAppErrorSaga(response.data.messages)
            }
        } catch (error: any) {
            handleServerNetworkErrorSaga(error.message)
        }
    }