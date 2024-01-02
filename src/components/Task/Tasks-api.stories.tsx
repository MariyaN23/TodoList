import React, {useEffect, useState} from 'react'
import {tasksApi} from '../../api/tasks-api';
import {TasksType} from '../../api/tasks-api';
import {ResponseType} from '../../api/todolists-api';

export default {
    title: 'API tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<TasksType[] | null>(null)
    useEffect(() => {
        tasksApi.getTasks('fba92dc8-d462-481c-a005-a42e2acce698')
            .then(response => {
                setState(response.data.items)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTasks = () => {
    const [state, setState] = useState<ResponseType | null>(null)
    useEffect(() => {
        tasksApi.createTasks('fba92dc8-d462-481c-a005-a42e2acce698', 'new putin task')
            .then(response => {
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTasks = () => {
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
    useEffect(() => {
        const newTask = {
            title: "putin",
            description: "ya russiky",
            completed: true,
            status: 1,
            priority: 1,
            startDate: "2024-01-02T12:52:20.037",
            deadline: "2024-01-02T12:52:20.037"
        }
        tasksApi.updateTasks('fba92dc8-d462-481c-a005-a42e2acce698', '0d4a1e6f-9afa-409c-8c9a-fdbdb4e59382', newTask)
            .then(response => {
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}