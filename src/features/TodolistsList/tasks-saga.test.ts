import {call, put} from 'redux-saga/effects';
import {
    addTaskWorkerSaga,
    CREATE_TASK,
    FETCH_TASKS,
    fetchTasksWorkerSaga,
    setTasksAC
} from './TasksReducer';
import {setAppErrorAC, setAppStatusAC} from '../../app/app-reducer';
import {ResponseTasksType, TaskPriorities, tasksApi, TaskStatuses} from '../../api/tasks-api';

beforeEach(()=> {

})

test('fetch tasks saga success', () => {
    const todolistID = 'todolistID'

    const gen = fetchTasksWorkerSaga({type: FETCH_TASKS, todolistId: todolistID})
    expect(gen.next().value).toEqual(put(setAppStatusAC('loading')))

    expect(gen.next().value).toEqual(call(tasksApi.getTasks, todolistID))

    const fakeResponse: ResponseTasksType = {
        items: [{
            id: '1',
            title: 'HTML&CSS',
            status: TaskStatuses.Completed,
            addedDate: '',
            deadline: '',
            order: 0,
            startDate: '',
            description: '',
            priority: TaskPriorities.Low,
            todoListId: todolistID
        }],
        totalCount: 1,
        error: ''
    }

    expect(gen.next(fakeResponse).value).toEqual(put(setTasksAC(todolistID, fakeResponse.items)))

    expect(gen.next().value).toEqual(put(setAppStatusAC('succeeded')))
    expect(gen.next().done).toBeTruthy()
})

test('add task saga error', () => {
    const todolistID = 'todolistID'

    const title = "title"
    const gen = addTaskWorkerSaga({type: CREATE_TASK, todoId: todolistID, title: title})
    expect(gen.next().value).toEqual(put(setAppStatusAC('loading')))
    expect(gen.next().value).toEqual(call(tasksApi.createTasks, todolistID, title))
    expect(gen.throw({message: 'some error'}).value).toEqual(put(setAppErrorAC('some error')))
    expect(gen.next().value).toEqual(put(setAppStatusAC('failed')))
})