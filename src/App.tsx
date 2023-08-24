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

    /*let [active, setActive] = useState<ActiveType>('All')

    const filterTask = (buttonName: ActiveType) => {
        setActive(buttonName)
    }
        let durshlag = tasks
        if (active === 'Active') {
            durshlag = tasks.filter(el => el.isDone)
        }
        if (active === 'Completed') {
            durshlag = tasks.filter(el => !el.isDone)
        }*/

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks} remove={removeTask}
                      //filter={filterTask}
            />
           {/* <Todolist title="Songs" tasks={tasks2} />*/}
        </div>
    );
}

export default App;
