import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type ActiveType = 'All' | 'Active' | 'Completed'

function App() {

/*    let tasks = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ]*/

    let [tasks, setTasks] = useState(
        [
            { id: 1, title: "HTML&CSS", isDone: true },
            { id: 2, title: "JS", isDone: true },
            { id: 3, title: "ReactJS", isDone: false }
        ]
    )

    const removeTask = (id: number)=> {
        /*tasks = tasks.filter(taskElement=>taskElement.id !== id)
        setTasks(tasks)*/

        setTasks(tasks.filter(taskElement=>taskElement.id !== id))
    }

    let durshlag = tasks

    let [active, setActive] = useState('All')
    const filterTask = (active: ActiveType) => {
        setActive(active)
    }
    if (active === 'Active') {
        (tasks.filter(el=>el.isDone))
    }
    if (active === 'Completed') {
        (tasks.filter(el=>!el.isDone))
    }

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={durshlag} remove={removeTask}
            filter={filterTask}/>
           {/* <Todolist title="Songs" tasks={tasks2} />*/}
        </div>
    );
}

export default App;
