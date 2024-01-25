import {TasksDomainType, tasksReducer} from './TasksReducer'
import {v1} from 'uuid';
import {addTodoListAC, setTodolistsAC} from './TodolistReducer';
import {TaskPriorities, TaskStatuses} from '../api/tasks-api';

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
    const newTitle = 'Redux'

    const endState = tasksReducer(startState, {type: 'ADD-TASK', payload: {todoId: todolistID1, title: newTitle}})

    expect(endState[todolistID1].length).toBe(4)
    expect(endState[todolistID1][0].title).toBe(newTitle)
    expect(endState[todolistID2].length).toBe(3)
})

test('correct task should be removed', () => {
    const endState = tasksReducer(startState, {type: 'REMOVE-TASK', payload: {todoId: todolistID1, taskId: '1'}})

    expect(endState[todolistID1].length).toBe(2)
    expect(endState[todolistID1][0].title).toBe('JS')
    expect(endState[todolistID1].every(t => t.id !== '1')).toBeTruthy()
    expect(endState[todolistID2].length).toBe(3)
})

test('correct task isDone should be changed to newIsDone', () => {
    const endState = tasksReducer(startState, {
        type: 'CHANGE-STATUS',
        payload: {todoId: todolistID1, taskId: '1', newStatus: TaskStatuses.New}
    })

    expect(endState[todolistID1][0].status).toBe(TaskStatuses.New)
    expect(endState[todolistID1][1].status).toBe(TaskStatuses.Completed)
    expect(endState[todolistID2][0].status).toBe(TaskStatuses.Completed)
})

test('correct task isDone should be changed to newIsDone', () => {
    const newTitle = 'Bounty'

    const endState = tasksReducer(startState, {
        type: 'UPDATE-TASK',
        payload: {todoId: todolistID2, taskId: '1', newTitle: newTitle}
    })

    expect(endState[todolistID2][0].title).toBe(newTitle)
    expect(endState[todolistID1][0].title).toBe('HTML&CSS')
})

test('new property with new array should be added when new todolist is added', () => {
    const action = addTodoListAC('new todilist')
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
    const action = setTodolistsAC([{id: "1", title: "title1", order: 0, addedDate: ""},
        {id: "2", title: "title2", order: 0, addedDate: ""}
    ])

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})