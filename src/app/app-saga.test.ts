import {initialiseAppWorkerSaga, setAppInitialisedAC} from './app-reducer';
import {authApi, MeResponseType} from '../api/auth-api';
import {call, put} from 'redux-saga/effects';
import {setIsAuthorisedAC} from '../features/Login/LoginReducer';

let meResponse: MeResponseType
beforeEach(()=> {
    meResponse = {
        resultCode: 0,
        data: {
            id: '',
            email: '',
            login: ''
        },
        fieldsErrors: [],
        messages: []
    }
})

test('initialize app worker saga success', () => {
    const gen = initialiseAppWorkerSaga()
    let result = gen.next()
    expect(result.value).toEqual(call(authApi.me))

    result = gen.next(meResponse)
    expect(result.value).toEqual(put(setIsAuthorisedAC(true)))

    result = gen.next()
    expect(result.value).toEqual(put(setAppInitialisedAC(true)))
})

test('initialize app worker saga unsuccessful', () => {
    const gen = initialiseAppWorkerSaga()
    let result = gen.next()
    expect(result.value).toEqual(call(authApi.me))

    meResponse.resultCode = 1
    result = gen.next(meResponse)
    expect(result.value).toEqual(put(setAppInitialisedAC(true)))
})