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
    | setStatusACType
    | setErrorACType

export type setStatusACType = ReturnType<typeof setStatusAC>
export const setStatusAC =(status: StatusType) =>
    ({type: 'APP/SET-STATUS', status} as const)

export type setErrorACType = ReturnType<typeof setErrorAC>
export const setErrorAC =(error: string | null) =>
    ({type: 'APP/SET-ERROR', error} as const)