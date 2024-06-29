import React, {useEffect} from 'react';
import './App.css';
import Container from '@mui/material/Container';
import {CircularProgress, LinearProgress} from '@mui/material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {useSelector} from 'react-redux';
import {Login, loginActions, loginSelectors} from '../features/Login';
import {Navigate, Route, Routes} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {selectIsInitialised, selectStatus} from './app-selectors';
import {appActions} from './index';
import {TodolistsList} from '../features/TodolistsList';
import {useActions} from '../common/utils/redux-utils';
import {Error404} from '../features/Error404/Error404';

function App(){
    const status = useSelector(selectStatus)
    const isInitialised = useSelector(selectIsInitialised)
    const isAuthorised = useSelector(loginSelectors.selectIsAuthorised)
    const {initialiseApp} = useActions(appActions)
    const {logout} = useActions(loginActions)

    useEffect(()=> {
        if (!isInitialised) {
            initialiseApp()
        }
    }, [])

    /*if (!isInitialised) {
        return (
            <div style={{height: "100vh", display: 'flex', alignItems: "center", justifyContent: "center"}} >
                <CircularProgress color={"secondary"}/>
            </div>
            )
    }*/
    const logoutHandler = ()=> {
        logout()
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
                <Container style={{padding: "50px 0 0 0"}}>
                    <Routes>
                        <Route path={'/'} element={<TodolistsList demo={false}/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/Error404'} element={<Error404/>}/>
                        <Route path={'/*'} element={<Navigate to={'/Error404'}/>}/>
                    </Routes>
                </Container >
            </div>
    );
}

export default App;
