import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from './components/AddItemForm';
import {ButtonAppBar} from './components/ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    addTodoListAC,
    changeFilterAC,
    removeTodoListAC,
    updateTodolistTitleAC
} from './reducers/TodolistReducer';
import {
    addTaskAC,
    changeIsDoneAC,
    removeTaskAC,
    updateTaskAC
} from './reducers/TasksReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './reducers/store';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksType = {
    [key: string] : TaskType[]
}

function App() {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, TodolistsType[]>(state=>state.todoLists)
    const tasks = useSelector<AppRootState, TasksType>(state=>state.tasks)

    const addTask = (todoId: string, title: string) => {
        dispatch(addTaskAC(todoId, title))
    }

    function removeTask(todoId: string, taskId: string) {
        dispatch(removeTaskAC(todoId, taskId))
    }

    function changeFilter(todoId: string, value: FilterValuesType) {
        dispatch(changeFilterAC(todoId, value))
    }

    const changeIsDone = (todoId: string, taskId: string, newIsDone: boolean) => {
        dispatch(changeIsDoneAC(todoId, taskId, newIsDone))
    }

    const removeTodoList = (todoId: string) => {
        dispatch(removeTodoListAC(todoId))
    }

    const addTodoList = (title: string) => {
        dispatch(addTodoListAC(title))
    }

    const updateTask = (todoId: string, taskId: string, newTitle: string) => {
        dispatch(updateTaskAC(todoId, taskId, newTitle))
    }

    const updateTodolistTitle = (todoId: string, newTitle: string) => {
        dispatch(updateTodolistTitleAC(todoId, newTitle))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm callBack={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(el => {

                        let tasksForTodolist = tasks[el.id];
                        if (el.filter === 'active') {
                            tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                        }
                        if (el.filter === 'completed') {
                            tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                        }

                        return (
                            <Grid item>
                                <Paper elevation={3}
                                        style={{padding: "10px"}}>
                                    <Todolist title={el.title}
                                              key={el.id}
                                              tasks={tasksForTodolist}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeIsDone={changeIsDone}
                                              todoId={el.id}
                                              removeTodoList={removeTodoList}
                                              updateTask={updateTask}
                                              updateTodolistTitle={updateTodolistTitle}/>
                                </Paper>
                            </Grid>)
                    })}
                </Grid>
            </Container>

        </div>
    );
}

export default App;
