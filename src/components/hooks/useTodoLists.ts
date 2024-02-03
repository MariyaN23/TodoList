import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from '../../app/store';
import {useCallback, useEffect} from 'react';
import {
    addTodolistTC,
    changeFilterAC, fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC, TodolistsDomainType,
    updateTodolistTitleTC
} from '../../features/TodolistsList/TodolistReducer';


export function useTodoLists () {
    const dispatch = useDispatch<any>()
    const todolists = useSelector<AppRootState, TodolistsDomainType[]>(state => state.todoLists)

    const changeFilter = useCallback((todoId: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todoId, value))
    }, [dispatch])

    const removeTodoList = useCallback((todoId: string) => {
        dispatch(removeTodolistTC(todoId))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    const updateTodolistTitle = useCallback((todoId: string, newTitle: string) => {
        dispatch(updateTodolistTitleTC(todoId, newTitle))
    }, [dispatch])

     const fetchTodolistsFunction = () => {
         dispatch(fetchTodolistsTC())
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