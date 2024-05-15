import {useSelector} from 'react-redux';
import {AppRootState} from '../../app/store';
import {useCallback, useState} from 'react';
import {FilterValuesType} from '../../features/TodolistsList/TodolistReducer';
import {TaskStatuses, TaskType} from '../../api/tasks-api';
import {useActions} from './useActions';
import {tasksActions} from '../../features/TodolistsList';


export function useTasks(todoId: string,
                         changeFilter: (todoId: string, value: FilterValuesType) => void,
                         filter: FilterValuesType,
                         updateTodolistTitle: (todoId: string, newTitle: string) => void) {
    const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[todoId])
    const {updateTaskTC, deleteTaskTC, addTaskTC} = useActions(tasksActions)

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
        addTaskTC({todoId, title})
    }, [])

    const updateTodolistTitleHandler = useCallback((newTitle: string) => {
        updateTodolistTitle(todoId, newTitle)
    }, [updateTodolistTitle, todoId])

    const removeTaskHandler = useCallback((tId: string) => {
        deleteTaskTC({todoId, tId})
    }, [])

    const updateTaskHandler = useCallback((tId: string, newTitle: string) =>
        updateTaskTC({todolistId: todoId, taskId: tId, model: {title: newTitle}}), [])

    const changeIsDoneHandler = useCallback((tId: string, checked: boolean) => {
        updateTaskTC({todolistId: todoId, taskId: tId, model: {status: checked ? TaskStatuses.Completed : TaskStatuses.New}})
    }, [])

    return {
        updateTodolistTitleHandler,
        addTaskHandler,
        tasksForTodolist,
        updateTaskHandler,
        removeTaskHandler,
        changeIsDoneHandler,
        buttonName,
        changeFilterHandler,
    }
}