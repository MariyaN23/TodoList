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
import {Login} from '../features/Login/Login';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

type AppPropsType = {
    demo?: boolean
}

function App({demo = false}: AppPropsType){
    console.log('App is called')
    const status = useSelector<AppRootState, StatusType>(state => state.app.status)
    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
                {status === 'loading' && <div className={"loading"}>
                    <LinearProgress color="secondary"/>
                </div>}
                <ButtonAppBar/>
                <Container>
                    <Routes>
                        <Route path={'/'} element={<TodolistsList demo={demo}/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default App;
