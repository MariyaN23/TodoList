import {AppDomainType, appReducer, setAppErrorAC, setAppStatusAC} from './app-reducer';

let startState: AppDomainType

beforeEach(()=>{
    startState = {
        status: 'idle',
        error: 'null',
        isInitialised: false
    }
})

test ('error message should be set', ()=> {
    const endState = appReducer(startState, setAppErrorAC('error'))

    expect(endState.error).toBe('error')
})

test ('correct status should be set', ()=> {
    const endState = appReducer(startState, setAppStatusAC('loading'))

    expect(endState.status).toBe('loading')
})