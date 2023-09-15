import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

   /* const [todoList, setTodoList] = useState<Array<TodoListType>>([
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false }
    ]);*/

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Chocolate', isDone: true},
            {id: v1(), title: 'Pizza', isDone: false},
            {id: v1(), title: 'Hot Dog', isDone: false},
        ]
    })


    const addTask = (todoId: string, title: string)=> {
        const newTask = { id: v1(), title: title, isDone: false }
        setTasks({...tasks, [todoId]: [newTask, ...tasks[todoId]]})
        //setTasks([newTask, ...tasks])
    }

    function removeTask(todoId: string, taskId: string) {
        setTasks({...tasks, [todoId]: tasks[todoId].filter(t => t.id !== taskId)})
        /*let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);*/
    }

    function changeFilter(todoId: string, value: FilterValuesType) {
        setTodolists(todolists.map(el=>el.id === todoId ? {...el, filter:value} : el));
    }

    const changeIsDone =(todoId: string, taskId: string, newIsDone: boolean)=> {
        setTasks({...tasks, [todoId]: tasks[todoId].map(el=>el.id === taskId ? {...el, isDone: newIsDone} : el)})
       /* setTasks(tasks.map(el=>el.id === taskId ? {...el, isDone: newIsDone} : el))*/
    }

    const removeTodoList =(todoId: string)=> {
        let filteredTodoLists = todolists.filter(el=>el.id !== todoId)
        setTodolists(filteredTodoLists)
        delete tasks[todoId]
    }

    return (
        <div className="App">
            {todolists.map(el=>{

                let tasksForTodolist = tasks[el.id];
                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone);
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
                              removeTodoList={removeTodoList}
                    />
                )
            })}
        </div>
    );
}

export default App;
