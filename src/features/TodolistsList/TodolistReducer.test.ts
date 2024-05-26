import {
    changeFilter, changeTodolistEntityStatus,
    TodolistsDomainType
} from './TodolistReducer'
import {v1} from 'uuid';
import {addTodolist, fetchTodolists, removeTodolist, updateTodolistTitle} from './TodolistsActions';
import {todolistReducer} from './';

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
    const action = removeTodolist.fulfilled({todoId: todolistID1}, 'requestId', {id: todolistID1})
    const endState = todolistReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})

test('correct todolist should be added', ()=> {
    const action = addTodolist.fulfilled({
        todolist: {
            id: '78',
            title: 'pizza',
            addedDate: '',
            order: 2
        }
    }, 'requestId', {title: 'pizza'})
    const endState = todolistReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].id).toBe('78')
})

test('correct filter should be changed', ()=> {
    const action = changeFilter({todoId: todolistID2, value: 'active'})
    const endState = todolistReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('active')
})

test('correct title should be updated', ()=> {
    const action = updateTodolistTitle.fulfilled({todoId: todolistID2, newTitle: 'New Title'}, 'requestId', {id: todolistID2, title: 'New Title'})
    const endState = todolistReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('New Title')
})

test('todolists should be setted', ()=> {
    const action = fetchTodolists.fulfilled({todolists: startState}, 'requestId')
    const endState = todolistReducer([], action)

    expect(endState.length).toBe(2)
})

test('correct status should be updated', ()=> {
    const action = changeTodolistEntityStatus({todoId: todolistID1, entityStatus: 'loading'})
    const endState = todolistReducer(startState, action)

    expect(endState[0].entityStatus).toBe("loading")
})