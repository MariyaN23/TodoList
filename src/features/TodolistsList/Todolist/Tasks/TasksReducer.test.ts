import {v1} from 'uuid';
import {addTask, deleteTask, fetchTasks, updateTask} from './TasksActions';
import {addTodolist, fetchTodolists} from '../../Todolists/TodolistsActions';
import {tasksReducer} from './';
import {TasksDomainType} from './TasksReducer';
import {TaskPriorities, TaskStatuses} from '../../../../api/types';

let todolistID1: string
let todolistID2: string
let startState: TasksDomainType

beforeEach(() => {
    todolistID1 = v1()
    todolistID2 = v1()
    startState = {
        [todolistID1]: [
            {
                id: '1',
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                order: 0,
                startDate: '',
                description: '',
                priority: TaskPriorities.Low,
                todoListId: todolistID1
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                order: 0,
                startDate: '',
                description: '',
                priority: TaskPriorities.Low,
                todoListId: todolistID1
            },
            {
                id: '3', title: 'ReactJS',
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                order: 0,
                startDate: '',
                description: '',
                priority: TaskPriorities.Low,
                todoListId: todolistID1
            }
        ],
        [todolistID2]: [
            {
                id: '1',
                title: 'Chocolate',
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                order: 0,
                startDate: '',
                description: '',
                priority: TaskPriorities.Low,
                todoListId: todolistID2
            },
            {
                id: '2',
                title: 'Pizza',
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                order: 0,
                startDate: '',
                description: '',
                priority: TaskPriorities.Low,
                todoListId: todolistID2
            },
            {
                id: '3',
                title: 'Hot Dog',
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                order: 0,
                startDate: '',
                description: '',
                priority: TaskPriorities.Low,
                todoListId: todolistID2
            }
        ]
    }
})

test('correct task should be added', () => {
    const newTask = {
        id: '4',
        title: 'Chocolate',
        status: TaskStatuses.Completed,
        addedDate: '',
        deadline: '',
        order: 0,
        startDate: '',
        description: '',
        priority: TaskPriorities.Low,
        todoListId: todolistID2
    }
    const action = addTask.fulfilled({task: newTask}, 'requestId', {
        todoId: todolistID1,
        title: newTask.title
    })
    const endState = tasksReducer(startState, action)

    expect(endState[todolistID2].length).toBe(4)
    expect(endState[todolistID2][0].title).toBe(newTask.title)
    expect(endState[todolistID1].length).toBe(3)
})

test('correct task should be removed', () => {
    const action = deleteTask.fulfilled({todoId: todolistID1, taskId: '1'}, 'requestId', {
        todoId: todolistID1,
        tId: '1'
    })
    const endState = tasksReducer(startState, action)

    expect(endState[todolistID1].length).toBe(2)
    expect(endState[todolistID1][0].title).toBe('JS')
    expect(endState[todolistID1].every(t => t.id !== '1')).toBeTruthy()
    expect(endState[todolistID2].length).toBe(3)
})

test('correct task isDone should be changed to newIsDone', () => {
    const newTask = {
        id: '3',
        title: 'Hot Dog',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        order: 0,
        startDate: '',
        description: '',
        priority: TaskPriorities.Low,
        todoListId: todolistID2
    }
    const action = updateTask.fulfilled({newTask}, 'requestId', {todolistId: newTask.todoListId, taskId: newTask.id, model: newTask})
    const endState = tasksReducer(startState, action)

    expect(endState[todolistID1][0].status).toBe(TaskStatuses.Completed)
    expect(endState[todolistID1][1].status).toBe(TaskStatuses.Completed)
    expect(endState[todolistID2][2].status).toBe(TaskStatuses.New)
})

test('correct task title should be changed to newTitle', () => {
    const newTitle = 'Bounty'
    const newTask = {
        id: '1',
        title: newTitle,
        status: TaskStatuses.Completed,
        addedDate: '',
        deadline: '',
        order: 0,
        startDate: '',
        description: '',
        priority: TaskPriorities.Low,
        todoListId: todolistID2
    }
    const action = updateTask.fulfilled({newTask}, 'requestId', {todolistId: newTask.todoListId, taskId: newTask.id, model: newTask})
    const endState = tasksReducer(startState, action)

    expect(endState[todolistID2][0].title).toBe(newTitle)
    expect(endState[todolistID1][0].title).toBe('HTML&CSS')
})

test('new property with new array should be added when new todolist is added', () => {
    const action = addTodolist.fulfilled({
        todolist: {
            id: '78',
            title: 'pizza',
            addedDate: '',
            order: 2
        }
    }, 'requestId', {title: 'pizza'})
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != todolistID1 && k != todolistID2)
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toStrictEqual([])
})

test('empty array should be added when we set todolists', () => {
    const action = fetchTodolists.fulfilled({
        todolists: [{id: '1', title: 'title1', order: 0, addedDate: ''},
            {id: '2', title: 'title2', order: 0, addedDate: ''}]
    }, 'requestId')
    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})

test('tasks should be setted', () => {
    const action = fetchTasks.fulfilled({tasks: startState[todolistID1], todolistId: todolistID1},
        'requestId', todolistID1)
    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todolistID1][0].startDate).toBe('')
})