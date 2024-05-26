import {instance} from './todolists-api';
import {AuthMeDataType, LoginParamsType, ResponseType} from './types';

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