import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    const [todoList, setTodoList] = useState<Array<TodoListType>>([
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false }
    ]);

    const addTask = (title: string)=> {
        const newTask = { id: v1(), title: title, isDone: false }
        setTasks([newTask, ...tasks])
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

    function changeFilter(todoId: string, value: FilterValuesType) {
        setTodoList(todoList.map(el=>el.id === todoId ? {...el, filter:value} : el));
    }

    const changeIsDone =(taskId: string, newIsDone: boolean)=> {
        setTasks(tasks.map(el=>el.id === taskId ? {...el, isDone: newIsDone} : el))
    }

    return (
        <div className="App">
            {todoList.map(el=>{

                let tasksForTodolist = tasks;
                if (el.filter === "active") {
                    tasksForTodolist = tasks.filter(t => !t.isDone);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks.filter(t => t.isDone);
                }

                return (
                    <Todolist title={el.title}
                              key={el.id}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeIsDone={changeIsDone}
                              todoId={el.id}
                    />
                )
            })}
        </div>
    );
}

export default App;
