import {v1} from 'uuid';
import {TasksType, TodolistsType} from '../components/App/App';
import {addTodoListAC, removeTodoListAC, todolistReducer} from './TodolistReducer';
import {tasksReducer} from './TasksReducer';

test ('ids should be equal', ()=> {
    const startTasksState: TasksType = {}
    const startTodolistState: TodolistsType[] = []

    const action = addTodoListAC("new todilist")

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistState = todolistReducer(startTodolistState, action)

    const keys = Object.keys(endTasksState)
    const idFromTaks = keys[0]
    const idFromTodolists = endTodolistState[0].id

    expect(idFromTaks).toBe(action.payload.todoId)
    expect(idFromTodolists).toBe(action.payload.todoId)
})

test ('property with todolistId should be deleted', ()=> {
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

    const action = removeTodoListAC(todolistID2)
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todolistID2]).toBeUndefined()
})