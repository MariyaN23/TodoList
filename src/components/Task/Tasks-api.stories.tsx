import React, {useState} from 'react'
import {tasksApi, TaskType} from '../../api/tasks-api';
import {ResponseType} from '../../api/todolists-api';

export default {
    title: 'API tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<TaskType[] | null>(null)
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
    const [state, setState] = useState<ResponseType<{item: TaskType[]}> | null>(null)
    const [todolistId, setTodolistId] = useState("")
    const [taskId, setTaskId] = useState("")
    const [title, setTitle] = useState("title 1")
    const [description, setDescription] = useState("description 1")
    const [status, setStatus] = useState(0)
    const [priority, setPriority] = useState(0)
    const updateTask = () => {
        tasksApi.updateTasks(todolistId, taskId, {
            deadline: '',
            description,
            title,
            status,
            completed: false,
            priority,
            startDate: ''
        })
            .then(response => {
                setState(response.data)
            })
        setTodolistId('')
        setTaskId('')
        setTitle('')
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e)=>setTodolistId(e.currentTarget.value)}/>
            <input placeholder={"taskId"} value={taskId} onChange={(e)=>setTaskId(e.currentTarget.value)}/>
            <input placeholder={"title"} value={title} onChange={(e)=>setTitle(e.currentTarget.value)}/>
            <input placeholder={"description"} value={description} onChange={(e)=>setDescription(e.currentTarget.value)}/>
            <input placeholder={"status"} value={status} type={'number'} onChange={(e)=>setStatus(+e.currentTarget.value)}/>
            <input placeholder={"priority"} value={priority} type={'number'} onChange={(e)=>setPriority(+e.currentTarget.value)}/>
            <button onClick={updateTask}>Update Task</button>
        </div>
    </div>
}