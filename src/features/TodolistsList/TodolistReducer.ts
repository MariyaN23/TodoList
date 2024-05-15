import {TodolistsType} from '../../api/todolists-api';
import {StatusType} from '../../app/app-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearTasksAndTodolistsAC} from '../../common/actions/common.actions';
import {addTodolistTC, fetchTodolistsTC, removeTodolistTC, updateTodolistTitleTC} from './TodolistsActions';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsDomainType = TodolistsType & {
    filter: FilterValuesType
    entityStatus: StatusType
}

const initialState: TodolistsDomainType[] = []

const slice = createSlice({
    name: "todoLists",
    initialState,
    reducers: {
        changeFilterAC(state, action: PayloadAction<{todoId: string, value: FilterValuesType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoId)
            if (index > -1) {
                state[index].filter = action.payload.value
            }
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{todoId: string, entityStatus: StatusType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoId)
            if (index > -1) {
                state[index].entityStatus = action.payload.entityStatus
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action)=> {
            return action.payload.todolists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        })
            .addCase(removeTodolistTC.fulfilled, (state, action)=> {
                const index = state.findIndex(tl => tl.id === action.payload.todoId)
                if (index > -1) {
                    state.splice(index, 1)
                }
            })
            .addCase(addTodolistTC.fulfilled, (state, action)=> {
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
            })
            .addCase(updateTodolistTitleTC.fulfilled, (state,action)=> {
                const index = state.findIndex(tl => tl.id === action.payload.todoId)
                if (index > -1) {
                    state[index].title = action.payload.newTitle
                }
            })
            .addCase(clearTasksAndTodolistsAC, ()=> {
                return []
            })
    }
})

export const todolistReducer = slice.reducer
export const {changeTodolistEntityStatusAC,
    changeFilterAC} = slice.actions