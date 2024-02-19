import React, {useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Todolist} from './Todolist/Todolist';
import {useTodoLists} from '../../components/hooks/useTodoLists';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';

type TodolistsPropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<TodolistsPropsType> = ({demo = false}) => {
    const {
        addTodoList,
        todolists,
        changeFilter,
        removeTodoList,
        updateTodolistTitle,
        fetchTodolistsFunction
    } = useTodoLists()

    useEffect(() => {
        if (demo) {
            return;
        }
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
                            <Todolist key={el.id}
                                      todolist={el}
                                      changeFilter={changeFilter}
                                      removeTodoList={removeTodoList}
                                      updateTodolistTitle={updateTodolistTitle}
                                      demo={demo}
                            />
                        </Paper>
                    </Grid>)
            })}
        </Grid>
    </>
};