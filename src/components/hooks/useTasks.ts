import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from '../../reducers/store';
import {useCallback, useState} from 'react';
import {FilterValuesType} from '../App/App';
import {addTaskAC, changeIsDoneAC, removeTaskAC, updateTaskAC} from '../../reducers/TasksReducer';
import {TaskType} from '../Todolist/Todolist';

export function useTasks(todoId: string,
                         changeFilter: (todoId: string, value: FilterValuesType) => void,
                         filter: FilterValuesType,
                         updateTodolistTitle: (todoId: string, newTitle: string) => void) {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[todoId])

    const [buttonName, setButtonName] = useState('all')

    const changeFilterHandler = useCallback((filter: FilterValuesType) => {
        changeFilter(todoId, filter)
        setButtonName(filter)
    }, [changeFilter, todoId])

    let allTasksForTodolist = tasks
    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = allTasksForTodolist.filter(t => !t.isDone);
    }
    if (filter === 'completed') {
        tasksForTodolist = allTasksForTodolist.filter(t => t.isDone);
    }

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskAC(todoId, title))
    }, [dispatch, todoId])

    const updateTodolistTitleHandler = useCallback((newTitle: string) => {
        updateTodolistTitle(todoId, newTitle)
    }, [updateTodolistTitle, todoId])

    const removeTaskHandler = useCallback((tId: string) => dispatch(removeTaskAC(todoId, tId)), [dispatch, todoId])

    const updateTaskHandler = useCallback((tId: string, newTitle: string) => dispatch(updateTaskAC(todoId, tId, newTitle)), [dispatch, todoId])

    const changeIsDoneHandler = useCallback((tId: string, checked: boolean) => {
        dispatch(changeIsDoneAC(todoId, tId, checked))
    }, [dispatch, todoId])

    return {
        updateTodolistTitleHandler,
        addTaskHandler,
        tasksForTodolist,
        updateTaskHandler,
        removeTaskHandler,
        changeIsDoneHandler,
        buttonName,
        changeFilterHandler
    }
}