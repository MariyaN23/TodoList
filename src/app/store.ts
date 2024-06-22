import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {tasksReducer, TasksReducerType, tasksWatcherSaga} from '../features/TodolistsList/TasksReducer';
import {todolistReducer, TodolistReducerType, todolistsWatcherSaga} from '../features/TodolistsList/TodolistReducer';
import {thunk} from 'redux-thunk';
import {appReducer, AppReducerType, appWatcherSaga} from './app-reducer';
import {loginReducer, LoginReducerType} from '../features/Login/LoginReducer';
import createSagaMiddleware from 'redux-saga'
import {all} from 'redux-saga/effects'


export type AppRootState = ReturnType<typeof rootReducer>
export type AppActionsType = TasksReducerType | TodolistReducerType | AppReducerType | LoginReducerType
export type AppDispatch = typeof store.dispatch
//export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>

export const rootReducer = combineReducers({
    todoLists: todolistReducer,
    tasks: tasksReducer,
    app: appReducer,
    login: loginReducer,
})

const sagaMiddleware = createSagaMiddleware()

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware))

sagaMiddleware.run(rootWatcher)

function* rootWatcher() {
    yield all([ appWatcherSaga(), tasksWatcherSaga(), todolistsWatcherSaga()])
}

// @ts-ignore
window.store = store