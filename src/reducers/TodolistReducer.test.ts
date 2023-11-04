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