import axios from 'axios';
import {ResponseType, TodolistsType} from './types';

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'fcbd2d1d-5aab-433e-b249-8b4e322d91d2'
    }
}

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistsType[]>('todo-lists')
    },
    createTodolists(title: string) {
        return instance.post<ResponseType<{ item: TodolistsType }>>('todo-lists', {title})
    },
    deleteTodolists(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolists(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title})
    }
}