import {instance, ResponseType} from './todolists-api';

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: boolean
}

export const authApi = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{userId?: string}>>('auth/login', data)
    }
}