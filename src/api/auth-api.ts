import {instance, ResponseType} from './todolists-api';

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

type AuthMeDataType = {
    id: string
    email: string
    login: string
}

export const authApi = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{userId?: number}>>('auth/login', data)
    },
    logout() {
        return instance.delete<ResponseType>('auth/login')
    },
    me() {
        return instance.get<ResponseType<AuthMeDataType>>('auth/me')
    }
}