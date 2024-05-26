import {rootReducer, store} from '../../app/store';

export type AppRootState = ReturnType<RootReducerType>
export type RootReducerType = typeof rootReducer
export type AppDispatchType = typeof store.dispatch