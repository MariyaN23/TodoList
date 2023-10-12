import {TasksType} from '../App';
import {v1} from 'uuid';

export const TasksReducer = (state: TasksType, action: TasksReducerType): TasksType => {
    switch (action.type) {
        case 'ADD-TASK': {
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todoId]: [newTask, ...state[action.payload.todoId]]}
        }
        case 'REMOVE-TASK': {
            return {...state, [action.payload.todoId]: state[action.payload.todoId].filter(t => t.id !== action.payload.taskId)}
        }
        case 'CHANGE-IS-DONE': {
            return {...state, [action.payload.todoId]: state[action.payload.todoId].map(el => el.id === action.payload.taskId ? {...el, isDone: action.payload.newIsDone} : el)}
        }
        case 'UPDATE-TASK': {
            return {...state, [action.payload.todoId]: state[action.payload.todoId].map(t => t.id === action.payload.taskId ? {...t, title: action.payload.newTitle} : t)}
        }
        case 'ADD-TASK-TO-NEW-TODOLIST': {
            return {...state, [action.payload.newTodoListId]: []}
        }
        default :
            return state
    }
}

type TasksReducerType = addTaskACType | removeTaskACType | changeIsDoneACType | updateTaskACType | addTasksToNewTodolistACType

type addTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (todoId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {todoId, title}
    } as const
}

type removeTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (todoId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {todoId, taskId}
    } as const
}

type changeIsDoneACType = ReturnType<typeof changeIsDoneAC>

export const changeIsDoneAC = (todoId: string, taskId: string, newIsDone: boolean) => {
    return {
        type: 'CHANGE-IS-DONE',
        payload: {todoId, taskId, newIsDone}
    } as const
}

type updateTaskACType = ReturnType<typeof updateTaskAC>

export const updateTaskAC = (todoId: string, taskId: string, newTitle: string) => {
    return {
        type: 'UPDATE-TASK',
        payload: {todoId, taskId, newTitle}
    } as const
}

type addTasksToNewTodolistACType = ReturnType<typeof addTasksToNewTodolistAC>

export const addTasksToNewTodolistAC = (newTodoListId: string) => {
    return {
        type: 'ADD-TASK-TO-NEW-TODOLIST',
        payload: {newTodoListId}
    } as const
}