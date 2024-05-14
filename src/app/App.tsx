import React, {useEffect} from 'react';
import './App.css';
import Container from '@mui/material/Container';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {CircularProgress, LinearProgress} from '@mui/material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './store';
import {initialiseAppTC} from './app-reducer';
import {Login} from '../features/Login/Login';
import {Route, Routes} from 'react-router-dom';
import {logoutTC} from '../features/Login/LoginReducer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {ThunkDispatch} from 'redux-thunk';
import {loginSelectors} from '../features/Login';
import {selectIsInitialised, selectStatus} from './app-selectors';


type AppPropsType = {
    demo?: boolean
}

function App({demo = false}: AppPropsType){
    const status = useSelector(selectStatus)
    const isInitialised = useSelector(selectIsInitialised)
    const isAuthorised = useSelector(loginSelectors.selectIsAuthorised)
    const dispatch = useDispatch<ThunkDispatch<AppRootState, unknown, any>>()

    useEffect(()=> {
        if (!demo) {
            dispatch(initialiseAppTC())
        }
    }, [])

    if (!isInitialised) {
        return (
            <div style={{height: "100vh", display: 'flex', alignItems: "center", justifyContent: "center"}} >
                <CircularProgress color={"secondary"}/>
            </div>
            )
    }
    const logoutHandler = ()=> {
        dispatch(logoutTC())
    }
    return (
            <div className="App">
                <ErrorSnackbar/>
                {status === 'loading' && <div className={"loading"}>
                    <LinearProgress color="secondary"/>
                </div>}
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" color="secondary">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Todolist
                            </Typography>
                            {isAuthorised && <Button color="inherit" onClick={logoutHandler}>Logout</Button>}
                        </Toolbar>
                    </AppBar>
                </Box>
                <Container>
                    <Routes>
                        <Route path={'/'} element={<TodolistsList demo={demo}/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                    </Routes>
                </Container>
            </div>
    );
}

export default App;
