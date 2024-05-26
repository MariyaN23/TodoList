import {TodolistsType} from '../../api/todolists-api';
import {StatusType} from '../../app/app-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearTasksAndTodolists} from '../../common/actions/common.actions';
import {addTodolist, fetchTodolists, removeTodolist, updateTodolistTitle} from './TodolistsActions';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsDomainType = TodolistsType & {
    filter: FilterValuesType
    entityStatus: StatusType
}

const initialState: TodolistsDomainType[] = []

export const slice = createSlice({
    name: "todoLists",
    initialState,
    reducers: {
        changeFilter(state, action: PayloadAction<{todoId: string, value: FilterValuesType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoId)
            if (index > -1) {
                state[index].filter = action.payload.value
            }
        },
        changeTodolistEntityStatus(state, action: PayloadAction<{todoId: string, entityStatus: StatusType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoId)
            if (index > -1) {
                state[index].entityStatus = action.payload.entityStatus
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchTodolists.fulfilled, (state, action)=> {
            return action.payload.todolists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        })
            .addCase(removeTodolist.fulfilled, (state, action)=> {
                const index = state.findIndex(tl => tl.id === action.payload.todoId)
                if (index > -1) {
                    state.splice(index, 1)
                }
            })
            .addCase(addTodolist.fulfilled, (state, action)=> {
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
            })
            .addCase(updateTodolistTitle.fulfilled, (state, action)=> {
                const index = state.findIndex(tl => tl.id === action.payload.todoId)
                if (index > -1) {
                    state[index].title = action.payload.newTitle
                }
            })
            .addCase(clearTasksAndTodolists, ()=> {
                return []
            })
    }
})

export const {changeTodolistEntityStatus,
    changeFilter} = slice.actions