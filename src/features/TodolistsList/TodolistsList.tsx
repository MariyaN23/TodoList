import React, {useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Todolist} from './Todolist/Todolist';
import {useTodoLists} from '../../components/hooks/useTodoLists';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';

export const TodolistsList = () => {
    const {
        addTodoList,
        todolists,
        changeFilter,
        removeTodoList,
        updateTodolistTitle,
        fetchTodolistsFunction
    } = useTodoLists()

    useEffect(() => {
        fetchTodolistsFunction()
    }, [])

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm callBack={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
            {todolists.map(el => {
                return (
                    <Grid item key={el.id}>
                        <Paper elevation={3}
                               style={{padding: '10px'}}>
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
    </>
};