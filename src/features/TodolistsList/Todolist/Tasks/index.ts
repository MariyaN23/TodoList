import {slice} from './TasksReducer';
import * as tasksAsyncActions from './TasksActions';
import * as tasksSelectors from './tasksSelectors'

const tasksReducer = slice.reducer
const tasksActions = {...tasksAsyncActions, ...slice.actions}

export {
    tasksReducer,
    tasksActions,
    tasksSelectors
}