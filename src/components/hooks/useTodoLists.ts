import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from '../../reducers/store';
import {useCallback} from 'react';
import {
    addTodoListAC,
    changeFilterAC,
    FilterValuesType,
    removeTodoListAC, TodolistsDomainType,
    updateTodolistTitleAC
} from '../../reducers/TodolistReducer';


export function useTodoLists () {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, TodolistsDomainType[]>(state => state.todoLists)

    const changeFilter = useCallback((todoId: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todoId, value))
    }, [dispatch])

    const removeTodoList = useCallback((todoId: string) => {
        dispatch(removeTodoListAC(todoId))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title))
    }, [dispatch])

    const updateTodolistTitle = useCallback((todoId: string, newTitle: string) => {
        dispatch(updateTodolistTitleAC(todoId, newTitle))
    }, [dispatch])

    return  {
        addTodoList,
        todolists,
        changeFilter,
        removeTodoList,
        updateTodolistTitle
    }
}