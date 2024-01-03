import React, {useEffect, useState} from 'react'
import {tasksApi} from '../../api/tasks-api';
import {TasksType} from '../../api/tasks-api';
import {ResponseType} from '../../api/todolists-api';

export default {
    title: 'API tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<TasksType[] | null>(null)
    const [todolistId, setTodolistId] = useState("")
    const getTasks =(() => {
        tasksApi.getTasks(todolistId)
            .then(response => {
                setState(response.data.items)
            })
        setTodolistId('')
    })
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e)=>setTodolistId(e.currentTarget.value)}/>
            <button onClick={getTasks}>Get Tasks</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<ResponseType | null>(null)
    const [todolistId, setTodolistId] = useState("")
    const [title, setTitle] = useState("")
    const createTask = () => {
        tasksApi.createTasks(todolistId, title)
            .then(response => {
                setState(response.data)
            })
        setTodolistId('')
        setTitle('')
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e)=>setTodolistId(e.currentTarget.value)}/>
            <input placeholder={"title"} value={title} onChange={(e)=>setTitle(e.currentTarget.value)}/>
            <button onClick={createTask}>Create Task</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<ResponseType | null>(null)
    const [todolistId, setTodolistId] = useState("")
    const [taskId, setTaskId] = useState("")
    const deleteTask = ()=>{
        tasksApi.deleteTasks(todolistId, taskId)
            .then(response => {
                setState(response.data)
            })
        setTodolistId("")
        setTaskId ("")
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e)=>setTodolistId(e.currentTarget.value)}/>
            <input placeholder={"taskId"} value={taskId} onChange={(e)=>setTaskId(e.currentTarget.value)}/>
            <button onClick={deleteTask}>Delete Task</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<ResponseType<{item: TasksType[]}> | null>(null)
    const [todolistId, setTodolistId] = useState("")
    const [taskId, setTaskId] = useState("")
    const [newTask, setNewTask] = useState({
        title: "putin",
        description: "ya russiky",
        completed: true,
        status: 1,
        priority: 1,
        startDate: "2024-01-02T12:52:20.037",
        deadline: "2024-01-02T12:52:20.037"
    })
    const updateTask = () => {
        tasksApi.updateTasks(todolistId, taskId, newTask)
            .then(response => {
                setState(response.data)
            })
        setTodolistId('')
        setTaskId('')
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e)=>setTodolistId(e.currentTarget.value)}/>
            <input placeholder={"taskId"} value={taskId} onChange={(e)=>setTaskId(e.currentTarget.value)}/>
            <input placeholder={"title"} value={newTask.title} onChange={(e)=>setNewTask({...newTask, title: e.currentTarget.value})}/>
            <input placeholder={"description"} value={newTask.description} onChange={(e)=>setNewTask({...newTask, description: e.currentTarget.value})}/>
            <button onClick={updateTask}>Update Task</button>
        </div>
    </div>
}