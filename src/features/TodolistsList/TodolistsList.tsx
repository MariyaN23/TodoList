import React, {useEffect} from 'react';
import Grid from '@mui/material/Grid';
import {Todolist} from './Todolist/Todolist';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {loginSelectors} from '../Login';
import {todolistsActions} from './Todolists';
import {todolistsListSelectors} from './';
import {useActions} from '../../common/utils/redux-utils';

type TodolistsPropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<TodolistsPropsType> = ({demo = false}) => {
    const isAuthorised = useSelector(loginSelectors.selectIsAuthorised)
    const todolists = useSelector(todolistsListSelectors.selectTodolists)
    const {
        addTodolist,
        fetchTodolists
    } = useActions(todolistsActions)

    useEffect(() => {
        if (demo || !isAuthorised) {
            return;
        }
        if (!todolists.length) {
            fetchTodolists()
        }
    }, [demo, fetchTodolists, isAuthorised])
    if (!isAuthorised) {
        return <Navigate to={'/login'} replace={true}/>
    }

    const addTodolistHandler = (params: {title: string}) => {
        addTodolist({title: params.title})
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm callBack={addTodolistHandler}/>
        </Grid>
        <Grid container spacing={3} style={{flexWrap: "nowrap", overflowX: "scroll"}}>
            {todolists.map(el => {
                return (
                    <Grid item key={el.id}>
                        <div style={{width: '300px', paddingBottom: "20px"}}>
                            <Todolist key={el.id}
                                      todolist={el}
                                      demo={demo}
                            />
                        </div>
                    </Grid>)
            })}
        </Grid>
    </>
};