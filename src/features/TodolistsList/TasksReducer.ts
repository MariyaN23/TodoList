import {TaskType} from '../../api/tasks-api';
import {createSlice} from '@reduxjs/toolkit';
import {clearTasksAndTodolistsAC} from '../../common/actions/common.actions';
import {addTaskTC, deleteTaskTC, fetchTasksTC, updateTaskTC} from './TasksActions';
import {addTodolistTC, fetchTodolistsTC, removeTodolistTC} from './TodolistsActions';

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
            .addCase(addTodolistTC.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(removeTodolistTC.fulfilled, (state, action) => {
                delete state[action.payload.todoId]
            })
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
                action.payload.todolists.forEach(el => state[el.id] = [])
            })
            .addCase(fetchTasksTC.fulfilled, (state, action)=> {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(deleteTaskTC.fulfilled, (state, action)=> {
                const index = state[action.payload.todoId].findIndex(el => el.id === action.payload.taskId)
                if (index > -1) {
                    state[action.payload.todoId].splice(index, 1)
                }
            })
            .addCase(addTaskTC.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            })
            .addCase(updateTaskTC.fulfilled, (state, action)=> {
                const index = state[action.payload.newTask.todoListId].findIndex(el => el.id === action.payload.newTask.id)
                if (index > -1) {
                    state[action.payload.newTask.todoListId][index] = action.payload.newTask
                }
            })
            .addCase(clearTasksAndTodolistsAC, ()=> {
                return {}
            })
    }
})

export const tasksReducer = slice.reducer