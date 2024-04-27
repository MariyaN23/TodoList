import {v1} from 'uuid';
import {addTodolistTC, removeTodolistTC, todolistReducer, TodolistsDomainType} from './TodolistReducer';
import {TasksDomainType, tasksReducer} from './TasksReducer';
import {TaskPriorities, TaskStatuses} from '../../api/tasks-api';

test ('ids should be equal', ()=> {
    const startTasksState: TasksDomainType = {}
    const startTodolistState: TodolistsDomainType[] = []
    const newTodolist = {
        id: "1",
        addedDate: "",
        order: 1,
        title: "pizza"
    }
    const action = addTodolistTC.fulfilled({todolist: newTodolist}, 'requestId', {title: "pizza"})
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistState = todolistReducer(startTodolistState, action)
    const keys = Object.keys(endTasksState)
    const idFromTaks = keys[0]
    const idFromTodolists = endTodolistState[0].id

    expect(idFromTaks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)
})

test ('property with todolistId should be deleted', ()=> {
    let todolistID1 = v1()
    let todolistID2 = v1()
    const startState: TasksDomainType = {
        [todolistID1]: [
            {id: '1', title: 'HTML&CSS', status: TaskStatuses.New, addedDate: '', deadline: '', order: 0, startDate: '', description: '', priority: TaskPriorities.Low, todoListId: todolistID1},
            {id: '2', title: 'JS', status: TaskStatuses.New, addedDate: '', deadline: '', order: 0, startDate: '', description: '', priority: TaskPriorities.Low, todoListId: todolistID1},
            {id: '3', title: 'ReactJS', status: TaskStatuses.New, addedDate: '', deadline: '', order: 0, startDate: '', description: '', priority: TaskPriorities.Low, todoListId: todolistID1}
        ],
        [todolistID2]: [
            {id: '1', title: 'Chocolate', status: TaskStatuses.New, addedDate: '', deadline: '', order: 0, startDate: '', description: '', priority: TaskPriorities.Low, todoListId: todolistID2},
            {id: '2', title: 'Pizza', status: TaskStatuses.New, addedDate: '', deadline: '', order: 0, startDate: '', description: '', priority: TaskPriorities.Low, todoListId: todolistID2},
            {id: '3', title: 'Hot Dog', status: TaskStatuses.New, addedDate: '', deadline: '', order: 0, startDate: '', description: '', priority: TaskPriorities.Low, todoListId: todolistID2}
        ]
    }
    const action = removeTodolistTC.fulfilled({todoId: todolistID2}, 'requestId', {id: todolistID2})
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todolistID2]).toBeUndefined()
})