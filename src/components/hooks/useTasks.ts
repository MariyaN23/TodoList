import {useSelector} from 'react-redux';
import {AppRootState} from '../../app/store';
import {useCallback, useState} from 'react';
import {FilterValuesType} from '../../features/TodolistsList/TodolistReducer';
import {TaskStatuses, TaskType} from '../../api/tasks-api';
import {useActions} from './useActions';
import {tasksActions} from '../../features/TodolistsList';


export function useTasks(todoId: string,
                         changeFilter: (params: {todoId: string, value: FilterValuesType}) => void,
                         filter: FilterValuesType,
                         updateTodolistTitle: (params: {id: string, title: string}) => void) {
    const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[todoId])
    const {updateTask, deleteTask, addTask} = useActions(tasksActions)

    const [buttonName, setButtonName] = useState('all')

    const changeFilterHandler = useCallback((value: FilterValuesType) => {
        changeFilter({todoId, value})
        setButtonName(value)
    }, [changeFilter, todoId])

    let allTasksForTodolist = tasks
    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = allTasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }
    if (filter === 'completed') {
        tasksForTodolist = allTasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
    }

    const addTaskHandler = useCallback(async (params: {title: string}) => {
        addTask({todoId, title: params.title})
        return ""
    }, [])

    const updateTodolistTitleHandler = useCallback((title: string) => {
        updateTodolistTitle({id: todoId, title})
    }, [])

    const removeTaskHandler = useCallback((tId: string) => {
        deleteTask({todoId, tId})
    }, [])

    const updateTaskHandler = useCallback((tId: string, newTitle: string) =>
        updateTask({todolistId: todoId, taskId: tId, model: {title: newTitle}}), [])

    const changeIsDoneHandler = useCallback((tId: string, checked: boolean) => {
        updateTask({todolistId: todoId, taskId: tId, model: {status: checked ? TaskStatuses.Completed : TaskStatuses.New}})
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