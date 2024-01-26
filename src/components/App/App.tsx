import React, {useEffect} from 'react';
import './App.css';
import {Todolist} from '../Todolist/Todolist';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {ButtonAppBar} from '../ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {useTodoLists} from '../hooks/useTodoLists';

function App() {
    console.log('App is called')
    const {
        addTodoList,
        todolists,
        changeFilter,
        removeTodoList,
        updateTodolistTitle,
        fetchTodolistsFunction
    } = useTodoLists()

    useEffect(()=>{
        fetchTodolistsFunction()
    }, [])

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
                            <Grid item key={el.id}>
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
