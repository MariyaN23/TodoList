import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from '../../app/store';
import {useCallback} from 'react';
import {
    addTodolistTC,
    changeFilterAC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistReducerType,
    TodolistsDomainType,
    updateTodolistTitleTC
} from '../../features/TodolistsList/TodolistReducer';
import {ThunkDispatch} from 'redux-thunk';


export function useTodoLists () {
    const dispatch = useDispatch<ThunkDispatch<AppRootState, unknown, TodolistReducerType>>()
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