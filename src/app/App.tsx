import React, {useEffect} from 'react';
import './App.css';
import Container from '@mui/material/Container';
import {TodolistsList} from '../features/TodolistsList';
import {CircularProgress, LinearProgress} from '@mui/material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {useSelector} from 'react-redux';
import {Login, loginActions, loginSelectors} from '../features/Login';
import {Route, Routes} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {selectIsInitialised, selectStatus} from './app-selectors';
import {useActions} from '../components/hooks/useActions';
import {appActions} from './index';


type AppPropsType = {
    demo?: boolean
}

function App({demo = false}: AppPropsType){
    const status = useSelector(selectStatus)
    const isInitialised = useSelector(selectIsInitialised)
    const isAuthorised = useSelector(loginSelectors.selectIsAuthorised)
    const {initialiseApp} = useActions(appActions)
    const {logout} = useActions(loginActions)

    useEffect(()=> {
        if (!demo) {
            initialiseApp()
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
                <Container style={{margin: "50px 0 0 50px"}}>
                    <Routes>
                        <Route path={'/'} element={<TodolistsList demo={demo}/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                    </Routes>
                </Container>
            </div>
    );
}

export default App;
