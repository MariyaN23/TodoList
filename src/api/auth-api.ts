import {instance, ResponseType} from './todolists-api';
import {AxiosResponse} from 'axios';

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export type AuthMeDataType = {
    id: string
    email: string
    login: string
}
export type MeResponseType = ResponseType<AuthMeDataType>

export const authApi = {
    login(data: LoginParamsType): Promise<AxiosResponse<ResponseType<{userId?: number}>>> {
        return instance.post<ResponseType<{userId?: number}>>('auth/login', data)
    },
    logout(): Promise<AxiosResponse<ResponseType>> {
        return instance.delete<ResponseType>('auth/login')
    },
    me()  {
        const promise = instance.get<MeResponseType>('auth/me')
        return promise.then(res=>res.data)
    }
}