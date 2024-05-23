import {AppRootState} from './store';

export const selectStatus = (state: AppRootState) => state.app.status
export const selectIsInitialised = (state: AppRootState) => state.app.isInitialised
export const selectError = (state: AppRootState) => state.app.error