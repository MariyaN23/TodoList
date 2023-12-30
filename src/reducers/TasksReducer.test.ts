import {tasksReducer} from './TasksReducer'
import {v1} from 'uuid';
import {TasksType, TodolistsType} from '../components/App/App';
import {addTodoListAC} from './TodolistReducer';

let todolistID1:string
let todolistID2:string
let startState: TasksType

beforeEach(()=> {
    todolistID1 = v1()
    todolistID2 = v1()
    startState = {
        [todolistID1]: [
            {id:"1", title: 'HTML&CSS', isDone: true},
            {id: "2", title: 'JS', isDone: true},
            {id: "3", title: 'ReactJS', isDone: false}
        ],
        [todolistID2]: [
            {id: "1", title: 'Chocolate', isDone: true},
            {id: "2", title: 'Pizza', isDone: false},
            {id: "3", title: 'Hot Dog', isDone: false}
        ]
    }
})

test('correct task should be added', ()=> {
    const newTitle = 'Redux'

    const endState = tasksReducer(startState, {type: 'ADD-TASK', payload: {todoId: todolistID1, title: newTitle}})

    expect(endState[todolistID1].length).toBe(4)
    expect(endState[todolistID1][0].title).toBe(newTitle)
    expect(endState[todolistID2].length).toBe(3)
})

test('correct task should be removed', ()=> {
    const endState = tasksReducer(startState, {type: 'REMOVE-TASK', payload: {todoId: todolistID1, taskId: '1'}})

    expect(endState[todolistID1].length).toBe(2)
    expect(endState[todolistID1][0].title).toBe('JS')
    expect(endState[todolistID1].every(t => t.id !== '1')).toBeTruthy()
    expect(endState[todolistID2].length).toBe(3)
})

test('correct task isDone should be changed to newIsDone', ()=> {
    const endState = tasksReducer(startState, {type: 'CHANGE-IS-DONE', payload: {todoId: todolistID1, taskId: '1', newIsDone: false}})

    expect(endState[todolistID1][0].isDone).toBeFalsy()
    expect(endState[todolistID1][1].isDone).toBeTruthy()
    expect(endState[todolistID2][0].isDone).toBeTruthy()
})

test('correct task isDone should be changed to newIsDone', ()=> {
    const newTitle = 'Bounty'

    const endState = tasksReducer(startState, {type: 'UPDATE-TASK', payload: {todoId: todolistID2, taskId: '1', newTitle: newTitle}})

    expect(endState[todolistID2][0].title).toBe(newTitle)
    expect(endState[todolistID1][0].title).toBe('HTML&CSS')
})

test ('new property with new array should be added when new todolist is added', ()=> {
    const action = addTodoListAC("new todilist")
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k!=todolistID1 && k!=todolistID2)
    if (!newKey) {
        throw Error ('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toStrictEqual([])
})