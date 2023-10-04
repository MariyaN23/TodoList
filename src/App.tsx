import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import {ButtonAppBar} from './components/ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    addTodoListAC,
    changeFilterAC,
    removeTodoListAC,
    TodolistReducer,
    updateTodolistTitleAC
} from './reducers/TodolistReducer';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    const [todolists, dispatchTodolists] = useReducer(TodolistReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: 'Chocolate', isDone: true},
            {id: v1(), title: 'Pizza', isDone: false},
            {id: v1(), title: 'Hot Dog', isDone: false}
        ]
    })


    const addTask = (todoId: string, title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todoId]: [newTask, ...tasks[todoId]]})
    }

    function removeTask(todoId: string, taskId: string) {
        setTasks({...tasks, [todoId]: tasks[todoId].filter(t => t.id !== taskId)})
    }

    function changeFilter(todoId: string, value: FilterValuesType) {
        dispatchTodolists(changeFilterAC(todoId, value))
    }

    const changeIsDone = (todoId: string, taskId: string, newIsDone: boolean) => {
        setTasks({...tasks, [todoId]: tasks[todoId].map(el => el.id === taskId ? {...el, isDone: newIsDone} : el)})
    }

    const removeTodoList = (todoId: string) => {
        delete tasks[todoId]
        dispatchTodolists(removeTodoListAC(todoId))
    }

    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        setTasks({...tasks, [newTodoListId]: []})
        dispatchTodolists(addTodoListAC(title, newTodoListId))
    }

    const updateTask = (todoId: string, taskId: string, newTitle: string) => {
        setTasks({...tasks, [todoId]: tasks[todoId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
    }

    const updateTodolistTitle = (todoId: string, newTitle: string) => {
        dispatchTodolists(updateTodolistTitleAC(todoId, newTitle))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm callBack={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(el => {

                        let tasksForTodolist = tasks[el.id];
                        if (el.filter === 'active') {
                            tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                        }
                        if (el.filter === 'completed') {
                            tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                        }

                        return (
                            <Grid item>
                                <Paper elevation={3}
                                        style={{padding: "10px"}}>
                                    <Todolist title={el.title}
                                              key={el.id}
                                              tasks={tasksForTodolist}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeIsDone={changeIsDone}
                                              todoId={el.id}
                                              removeTodoList={removeTodoList}
                                              updateTask={updateTask}
                                              updateTodolistTitle={updateTodolistTitle}/>
                                </Paper>
                            </Grid>)
                    })}
                </Grid>
            </Container>

        </div>
    );
}

export default App;
