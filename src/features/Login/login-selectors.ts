import {AppRootState} from '../../common/utils/types';

export const selectIsAuthorised = (state: AppRootState) => state.login.isAuthorised