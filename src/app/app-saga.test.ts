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
    expect(gen.next().value).toEqual(call(authApi.me))

    expect(gen.next(meResponse).value).toEqual(put(setIsAuthorisedAC(true)))

    expect(gen.next().value).toEqual(put(setAppInitialisedAC(true)))
})

test('initialize app worker saga unsuccessful', () => {
    const gen = initialiseAppWorkerSaga()

    expect(gen.next().value).toEqual(call(authApi.me))

    meResponse.resultCode = 1

    expect(gen.next(meResponse).value).toEqual(put(setAppInitialisedAC(true)))
})