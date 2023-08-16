import React from 'react';
import './App.css';
import {TodoList} from './TodoList';

function App() {
    const truck1 = "What to learn1"
    const truck2 = "What to learn2222"

    const tasks1 = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ]
    const tasks2 = [
        { id: 1, title: "Hello world", isDone: true },
        { id: 2, title: "I am Happy", isDone: false },
        { id: 3, title: "Yo", isDone: false }
    ]


    return (
        <div className="App">
            <TodoList truck={truck1} task={tasks1}/>
            <TodoList truck={truck2} task={tasks2}/>
        </div>
    );
}

export default App;
