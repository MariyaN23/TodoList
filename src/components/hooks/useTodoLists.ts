import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppRootState} from '../../app/store';
import {useCallback} from 'react';
import {
    addTodolist,
    changeFilterAC, fetchTodolists,
    FilterValuesType, removeTodolist,
    TodolistsDomainType, updateTodolisttitle
} from '../../features/TodolistsList/TodolistReducer';


export function useTodoLists () {
    const dispatch = useDispatch<AppDispatch>()
    const todolists = useSelector<AppRootState, TodolistsDomainType[]>(state => state.todoLists)

    const changeFilter = useCallback((todoId: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todoId, value))
    }, [dispatch])

    const removeTodoList = useCallback((todoId: string) => {
        dispatch(removeTodolist(todoId))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolist(title))
    }, [dispatch])

    const updateTodolistTitle = useCallback((todoId: string, newTitle: string) => {
        dispatch(updateTodolisttitle(todoId, newTitle))
    }, [dispatch])

     const fetchTodolistsFunction = () => {
         dispatch(fetchTodolists())
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