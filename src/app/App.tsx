import React from 'react';
import './App.css';
import {ButtonAppBar} from '../components/ButtonAppBar';
import Container from '@mui/material/Container';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';

function App() {
    console.log('App is called')
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container>
                <TodolistsList/>
            </Container>
        </div>
    );
}

export default App;
