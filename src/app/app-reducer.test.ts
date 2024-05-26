import {AppDomainType, setAppError, setAppStatus} from './app-reducer';
import {appReducer} from './';

let startState: AppDomainType

beforeEach(()=>{
    startState = {
        status: 'idle',
        error: 'null',
        isInitialised: false
    }
})

test ('error message should be set', ()=> {
    const endState = appReducer(startState, setAppError({error: "error"}))

    expect(endState.error).toBe('error')
})

test ('correct status should be set', ()=> {
    const endState = appReducer(startState, setAppStatus({status: 'loading'}))

    expect(endState.status).toBe('loading')
})