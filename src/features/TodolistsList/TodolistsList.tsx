import React, {useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Todolist} from './Todolist/Todolist';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {loginSelectors} from '../Login';
import {useActions} from '../../components/hooks/useActions';
import {todolistsActions} from './index';
import {AppRootState} from '../../app/store';
import {TodolistsDomainType} from './TodolistReducer';

type TodolistsPropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<TodolistsPropsType> = ({demo = false}) => {
    const isAuthorised = useSelector(loginSelectors.selectIsAuthorised)
    const todolists = useSelector<AppRootState, TodolistsDomainType[]>(state => state.todoLists)
    const {
        addTodolist,
        changeFilter,
        removeTodolist,
        updateTodolistTitle,
        fetchTodolists
    } = useActions(todolistsActions)

    useEffect(() => {
        if (demo || !isAuthorised) {
            return;
        }
        fetchTodolists()
    }, [])

    if (!isAuthorised) {
        return <Navigate to={'/login'} replace={true}/>
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm callBack={addTodolist}/>
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
                                      removeTodoList={removeTodolist}
                                      updateTodolistTitle={updateTodolistTitle}
                                      demo={demo}
                            />
                        </Paper>
                    </Grid>)
            })}
        </Grid>
    </>
};