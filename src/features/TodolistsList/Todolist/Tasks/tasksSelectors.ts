import {AppRootState} from '../../../../app/store';

export const selectTasks = (todoId: string) => (state: AppRootState) => state.tasks[todoId]