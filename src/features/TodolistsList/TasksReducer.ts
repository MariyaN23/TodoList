import {TaskType} from '../../api/tasks-api';
import {createSlice} from '@reduxjs/toolkit';
import {clearTasksAndTodolists} from '../../common/actions/common.actions';
import {addTask, deleteTask, fetchTasks, updateTask} from './TasksActions';
import {addTodolist, fetchTodolists, removeTodolist} from './TodolistsActions';

export type TasksDomainType = {
    [key: string]: TaskType[]
}

const initialState: TasksDomainType = {}

const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(addTodolist.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                delete state[action.payload.todoId]
            })
            .addCase(fetchTodolists.fulfilled, (state, action) => {
                action.payload.todolists.forEach(el => state[el.id] = [])
            })
            .addCase(fetchTasks.fulfilled, (state, action)=> {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(deleteTask.fulfilled, (state, action)=> {
                const index = state[action.payload.todoId].findIndex(el => el.id === action.payload.taskId)
                if (index > -1) {
                    state[action.payload.todoId].splice(index, 1)
                }
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            })
            .addCase(updateTask.fulfilled, (state, action)=> {
                const index = state[action.payload.newTask.todoListId].findIndex(el => el.id === action.payload.newTask.id)
                if (index > -1) {
                    state[action.payload.newTask.todoListId][index] = action.payload.newTask
                }
            })
            .addCase(clearTasksAndTodolists, ()=> {
                return {}
            })
    }
})

export const tasksReducer = slice.reducer