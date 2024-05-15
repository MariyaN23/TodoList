import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from '../../app/store';
import {useCallback} from 'react';
import {
    changeFilterAC,
    FilterValuesType,
    TodolistsDomainType
} from '../../features/TodolistsList/TodolistReducer';
import {useActions} from './useActions';
import {todolistsActions} from '../../features/TodolistsList';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from '@reduxjs/toolkit';


export function useTodoLists () {
    const dispatch = useDispatch<ThunkDispatch<AppRootState, unknown, Action>>()
    const todolists = useSelector<AppRootState, TodolistsDomainType[]>(state => state.todoLists)
    const {updateTodolistTitleTC, removeTodolistTC, fetchTodolistsTC, addTodolistTC} = useActions(todolistsActions)

    const changeFilter = useCallback((todoId: string, value: FilterValuesType) => {
        dispatch(changeFilterAC({todoId: todoId, value: value}))
    }, [dispatch])

    const removeTodoList = useCallback((todoId: string) => {
        removeTodolistTC({id: todoId})
    }, [])

    const addTodoList = useCallback((title: string) => {
        addTodolistTC({title})
    }, [])

    const updateTodolistTitle = useCallback((todoId: string, newTitle: string) => {
        updateTodolistTitleTC({id: todoId, title: newTitle})
    }, [])

     const fetchTodolistsFunction = () => {
        fetchTodolistsTC()
     }


    return  {
        addTodoList,
        todolists,
        changeFilter,
        removeTodoList,
        updateTodolistTitle,
        fetchTodolistsFunction
    }
}