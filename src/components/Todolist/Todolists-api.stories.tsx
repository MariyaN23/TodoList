import React, {useEffect, useState} from 'react'
import {todolistsApi, TodolistsType} from '../../api/todolists-api';
import {ResponseType} from '../../api/todolists-api';

export default {
    title: 'API todolists'
}

export const GetTodolists = () => {
    const [state, setState] = useState<TodolistsType[] | null>(null)
    useEffect(() => {
        todolistsApi.getTodolists()
            .then(response => {
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<ResponseType<{item: TodolistsType}> | null>(null)
    useEffect(() => {
        todolistsApi.createTodolists("blue putin")
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<ResponseType | null>(null)
    useEffect(() => {
        todolistsApi.deleteTodolists('9a9499df-74f7-4b1a-b200-1a6c517e8b0e')
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<ResponseType | null>(null)
    useEffect(() => {
        todolistsApi.updateTodolists('fba92dc8-d462-481c-a005-a42e2acce698', 'sini putin')
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

