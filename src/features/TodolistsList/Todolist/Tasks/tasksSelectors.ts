import {AppRootState} from '../../../../common/utils/types';

export const selectTasks = (todoId: string) => (state: AppRootState) => state.tasks[todoId]