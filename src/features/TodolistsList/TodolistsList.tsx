import React, {useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Todolist} from './Todolist/Todolist';
import {useTodoLists} from '../../components/hooks/useTodoLists';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {loginSelectors} from '../Login';

type TodolistsPropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<TodolistsPropsType> = ({demo = false}) => {
    const isAuthorised = useSelector(loginSelectors.selectIsAuthorised)

    const {
        addTodoList,
        todolists,
        changeFilter,
        removeTodoList,
        updateTodolistTitle,
        fetchTodolistsFunction
    } = useTodoLists()

    useEffect(() => {
        if (demo || !isAuthorised) {
            return;
        }
        fetchTodolistsFunction()
    }, [])

    if (!isAuthorised) {
        return <Navigate to={'/login'} replace={true}/>
    }

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