import axios, {AxiosResponse} from 'axios';

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

export type TodolistsType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ResponseType<D = {}> = {
    data: D
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}

export const todolistsApi = {
    getTodolists(): Promise<AxiosResponse<TodolistsType[]>> {
        return instance.get<TodolistsType[]>('todo-lists')
    },
    createTodolists(title: string): Promise<AxiosResponse<ResponseType<{item: TodolistsType}>>> {
        return instance.post<ResponseType<{item: TodolistsType}>>('todo-lists', {title})
    },
    deleteTodolists(id: string): Promise<AxiosResponse<ResponseType>>  {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolists(id: string, title: string): Promise<AxiosResponse<ResponseType>>  {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title})
    }
}