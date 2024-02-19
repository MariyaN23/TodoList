import React from 'react';
import './App.css';
import {ButtonAppBar} from '../components/ButtonAppBar';
import Container from '@mui/material/Container';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {LinearProgress} from '@mui/material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {useSelector} from 'react-redux';
import {AppRootState} from './store';
import {StatusType} from './app-reducer';

type AppPropsType = {
    demo?: boolean
}

function App({demo = false}: AppPropsType){
    console.log('App is called')
    const status = useSelector<AppRootState, StatusType>(state => state.app.status)
    return (
        <div className="App">
            <ErrorSnackbar/>
            {status === 'loading' && <div className={"loading"}>
                <LinearProgress color="secondary"/>
            </div>}
            <ButtonAppBar/>
            <Container>
                <TodolistsList demo={demo}/>
            </Container>
        </div>
    );
}

export default App;
