import {AppRootState} from '../../app/store';

export const selectIsAuthorised = (state: AppRootState) => state.login.isAuthorised