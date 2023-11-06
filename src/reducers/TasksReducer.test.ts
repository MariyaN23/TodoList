import {TasksReducer} from './TasksReducer'
import {v1} from 'uuid';
import {TasksType, TodolistsType} from '../App';

test('correct task should be added', ()=> {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: TasksType = {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: 'Chocolate', isDone: true},
            {id: v1(), title: 'Pizza', isDone: false},
            {id: v1(), title: 'Hot Dog', isDone: false}
        ]
    }

    const newTitle = 'Redux'

    const endState = TasksReducer(startState, {type: 'ADD-TASK', payload: {todoId: todolistID1, title: newTitle}})

    expect(endState[todolistID1].length).toBe(4)
    expect(endState[todolistID1][0].title).toBe(newTitle)
    expect(endState[todolistID2].length).toBe(3)
})

test('correct task should be removed', ()=> {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: TasksType = {
        [todolistID1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false}
        ],
        [todolistID2]: [
            {id: '1', title: 'Chocolate', isDone: true},
            {id: '2', title: 'Pizza', isDone: false},
            {id: '3', title: 'Hot Dog', isDone: false}
        ]
    }

    const endState = TasksReducer(startState, {type: 'REMOVE-TASK', payload: {todoId: todolistID1, taskId: '1'}})

    expect(endState[todolistID1].length).toBe(2)
    expect(endState[todolistID1][0].title).toBe('JS')
    expect(endState[todolistID1].every(t => t.id !== '1')).toBeTruthy()
    expect(endState[todolistID2].length).toBe(3)
})

test('correct task isDone should be changed to newIsDone', ()=> {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: TasksType = {
        [todolistID1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false}
        ],
        [todolistID2]: [
            {id: '1', title: 'Chocolate', isDone: true},
            {id: '2', title: 'Pizza', isDone: false},
            {id: '3', title: 'Hot Dog', isDone: false}
        ]
    }

    const endState = TasksReducer(startState, {type: 'CHANGE-IS-DONE', payload: {todoId: todolistID1, taskId: '1', newIsDone: false}})

    expect(endState[todolistID1][0].isDone).toBeFalsy()
    expect(endState[todolistID1][1].isDone).toBeTruthy()
    expect(endState[todolistID2][0].isDone).toBeTruthy()
})

test('correct task isDone should be changed to newIsDone', ()=> {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: TasksType = {
        [todolistID1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false}
        ],
        [todolistID2]: [
            {id: '1', title: 'Chocolate', isDone: true},
            {id: '2', title: 'Pizza', isDone: false},
            {id: '3', title: 'Hot Dog', isDone: false}
        ]
    }

    const newTitle = 'Bounty'

    const endState = TasksReducer(startState, {type: 'UPDATE-TASK', payload: {todoId: todolistID2, taskId: '1', newTitle: newTitle}})

    expect(endState[todolistID2][0].title).toBe(newTitle)
    expect(endState[todolistID1][0].title).toBe('HTML&CSS')
})

test('correct task should be added to new todolist', ()=> {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: TasksType = {
        [todolistID1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false}
        ],
        [todolistID2]: [
            {id: '1', title: 'Chocolate', isDone: true},
            {id: '2', title: 'Pizza', isDone: false},
            {id: '3', title: 'Hot Dog', isDone: false}
        ]
    }

    const newTodolistId = v1()

    const endState = TasksReducer(startState, {type: 'ADD-TASK-TO-NEW-TODOLIST', payload: {newTodoListId: newTodolistId}})

    const keys = Object.keys(endState)

    expect(endState[newTodolistId].length).toBe(0)
    expect(endState[newTodolistId]).toStrictEqual([])
    expect(keys.length).toBe(3)
})