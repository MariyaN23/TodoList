import {setTodolistsAC, todolistReducer, TodolistsDomainType} from './TodolistReducer'
import {v1} from 'uuid';

let todolistID1:string
let todolistID2:string
let startState: Array<TodolistsDomainType>


beforeEach(()=>{
    todolistID1 = v1()
    todolistID2 = v1()

    startState = [
        {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'}
    ]
})


test('correct todolist should be removed', ()=> {

    const endState = todolistReducer(startState, {type: 'REMOVE-TODOLIST', payload: {todoId: todolistID1}})

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})

test('correct todolist should be added', ()=> {
    const endState = todolistReducer(startState, {type: 'ADD-TODOLIST', payload: {
            id: '78',
            title: 'pizza',
            addedDate: '',
            order: 2
        }})

    expect(endState.length).toBe(3)
    expect(endState[0].id).toBe('78')
})

test('correct filter should be changed', ()=> {

    const endState = todolistReducer(startState, {type: 'CHANGE-FILTER', payload: {todoId: todolistID2, value: 'active'}})

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('active')
})

test('correct title should be updated', ()=> {

    const endState = todolistReducer(startState, {type: 'UPDATE-TITLE', payload: {todoId: todolistID2, newTitle: 'New Title'}})

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('New Title')
})

test('todolists should be setted', ()=> {

    const action = setTodolistsAC(startState)

    const endState = todolistReducer([], action)

    expect(endState.length).toBe(2)
})