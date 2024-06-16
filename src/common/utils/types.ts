import {store} from '../../app/store';
import {rootReducer} from '../../app/reducers';

export type AppRootState = ReturnType<RootReducerType>
export type RootReducerType = typeof rootReducer
export type AppDispatchType = typeof store.dispatch