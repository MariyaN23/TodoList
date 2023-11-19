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
    const todolists = useSelector<AppRootState, TodolistsType[]>(state => state.todoLists)

    function changeFilter(todoId: string, value: FilterValuesType) {
        dispatch(changeFilterAC(todoId, value))
    }

    const removeTodoList = (todoId: string) => {
        dispatch(removeTodoListAC(todoId))
    }

    const addTodoList = (title: string) => {
        dispatch(addTodoListAC(title))
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

                        return (
                            <Grid item>
                                <Paper elevation={3}
                                        style={{padding: "10px"}}>
                                    <Todolist title={el.title}
                                              key={el.id}
                                              changeFilter={changeFilter}
                                              todoId={el.id}
                                              removeTodoList={removeTodoList}
                                              updateTodolistTitle={updateTodolistTitle}
                                              filter={el.filter}
                                    />
                                </Paper>
                            </Grid>)
                    })}
                </Grid>
            </Container>

        </div>
    );
}

export default App;
