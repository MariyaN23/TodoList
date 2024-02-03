import React, {useEffect, useState} from 'react'
import {todolistsApi, TodolistsType} from '../../../api/todolists-api';
import {ResponseType} from '../../../api/todolists-api';

export default {
    title: 'API todolists'
}

export const GetTodolists = () => {
    const [state, setState] = useState<TodolistsType[] | null>(null)
    const getTodolists = () => {
        todolistsApi.getTodolists()
            .then(response => {
                setState(response.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div><button onClick={getTodolists}>Get Todolists</button></div>
    </div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<ResponseType<{ item: TodolistsType }> | null>(null)
    const [title, setTitle] = useState("")
    const createTodolist = () => {
        todolistsApi.createTodolists(title)
            .then(response => {
                setState(response.data)
            })
        setTitle('')
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"title"} value={title} onChange={(e)=>setTitle(e.currentTarget.value)}/>
            <button onClick={createTodolist}>Create Todolist</button>
        </div>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<ResponseType | null>(null)
    const [todolistId, setTodolistId] = useState("")
    const deleteTodolist = () => {
        todolistsApi.deleteTodolists(todolistId)
            .then(response => {
                setState(response.data)
            })
        setTodolistId('')
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e)=>setTodolistId(e.currentTarget.value)}/>
            <button onClick={deleteTodolist}>Delete Todolist</button>
        </div>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<ResponseType | null>(null)
    const [todolistId, setTodolistId] = useState("")
    const [title, setTitle] = useState("")
    const updateTodolist = () => {
        todolistsApi.updateTodolists(todolistId, title)
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
            <button onClick={updateTodolist}>Update Todolist title</button>
        </div>
    </div>
}

