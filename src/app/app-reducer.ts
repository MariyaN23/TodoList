export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppDomainType = {
    status: StatusType
    error: string | null
}

const initialState: AppDomainType = {
    status: 'idle',
    error: null
}

export const appReducer =(state: any = initialState, action: AppReducerType): AppDomainType=> {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export type AppReducerType =
    | setAppStatusACType
    | setAppErrorACType

export type setAppStatusACType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC =(status: StatusType) =>
    ({type: 'APP/SET-STATUS', status} as const)

export type setAppErrorACType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC =(error: string | null) =>
    ({type: 'APP/SET-ERROR', error} as const)