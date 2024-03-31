import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from '../../app/store';
import {useCallback, useState} from 'react';
import {addTaskTC, deleteTaskTC, updateTaskTC} from '../../features/TodolistsList/TasksReducer';
import {FilterValuesType} from '../../features/TodolistsList/TodolistReducer';
import {TaskStatuses, TaskType} from '../../api/tasks-api';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from '@reduxjs/toolkit';


export function useTasks(todoId: string,
                         changeFilter: (todoId: string, value: FilterValuesType) => void,
                         filter: FilterValuesType,
                         updateTodolistTitle: (todoId: string, newTitle: string) => void) {
    const dispatch = useDispatch<ThunkDispatch<AppRootState, unknown, Action>>()
    const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[todoId])

    const [buttonName, setButtonName] = useState('all')

    const changeFilterHandler = useCallback((filter: FilterValuesType) => {
        changeFilter(todoId, filter)
        setButtonName(filter)
    }, [changeFilter, todoId])

    let allTasksForTodolist = tasks
    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = allTasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }
    if (filter === 'completed') {
        tasksForTodolist = allTasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
    }

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskTC(todoId, title))
    }, [dispatch, todoId])

    const updateTodolistTitleHandler = useCallback((newTitle: string) => {
        updateTodolistTitle(todoId, newTitle)
    }, [updateTodolistTitle, todoId])

    const removeTaskHandler = useCallback((tId: string) => {
        dispatch(deleteTaskTC(todoId, tId))
    }, [dispatch, todoId])

    const updateTaskHandler = useCallback((tId: string, newTitle: string) => dispatch(updateTaskTC(todoId, tId, {title: newTitle})), [dispatch, todoId])

    const changeIsDoneHandler = useCallback((tId: string, checked: boolean) => {
        dispatch(updateTaskTC(todoId, tId, {status: checked ? TaskStatuses.Completed : TaskStatuses.New}))
    }, [dispatch, todoId])

    /*const fetchTasksFunction = () => {
        dispatch(fetchTasksTC(todoId))
    }*/

    return {
        updateTodolistTitleHandler,
        addTaskHandler,
        tasksForTodolist,
        updateTaskHandler,
        removeTaskHandler,
        changeIsDoneHandler,
        buttonName,
        changeFilterHandler,
        //fetchTasksFunction,
    }
}