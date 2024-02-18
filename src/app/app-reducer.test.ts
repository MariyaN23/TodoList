import {AppDomainType, appReducer, setErrorAC, setStatusAC} from './app-reducer';

let startState: AppDomainType

beforeEach(()=>{
    startState = {
        status: 'idle',
        error: 'null'
    }
})

test ('error message should be set', ()=> {
    const endState = appReducer(startState, setErrorAC('error'))

    expect(endState.error).toBe('error')
})

test ('correct status should be set', ()=> {
    const endState = appReducer(startState, setStatusAC('loading'))

    expect(endState.status).toBe('loading')
})