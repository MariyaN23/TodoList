import {TodolistReducer} from './TodolistReducer'
import {v1} from 'uuid';
import {TodolistsType} from '../App';

test('correct todolist should be removed', ()=> {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]

    const endState = TodolistReducer(startState, {type: 'REMOVE-TODOLIST', payload: {todoId: todolistID1}})

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})

test('correct todolist should be added', ()=> {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]

    const newTodolistTitle = "New Todolist"
    const newTodolistID = v1()

    const endState = TodolistReducer(startState, {type: 'ADD-TODOLIST', payload: {todoId: newTodolistID, title: newTodolistTitle}})

    expect(endState.length).toBe(3)
    expect(endState[0].id).toBe(newTodolistID)
})

test('correct filter should be changed', ()=> {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]

    const endState = TodolistReducer(startState, {type: 'CHANGE-FILTER', payload: {todoId: todolistID2, value: 'active'}})

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('active')
})

test('correct title should be updated', ()=> {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]

    const endState = TodolistReducer(startState, {type: 'UPDATE-TITLE', payload: {todoId: todolistID2, newTitle: 'New Title'}})

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('New Title')
})