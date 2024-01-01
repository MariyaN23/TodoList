import axios from 'axios';

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "fcbd2d1d-5aab-433e-b249-8b4e322d91d2"
    }
}

export const todolistsApi = {
    getTodolists() {
         return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
    },
    createTodolists(title: string) {
        return axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, settings)
    },
    deleteTodolists() {
        const todolistId = '099e29bf-0ce5-4acc-82cb-b38cd5e30e18'
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
    },
    updateTodolists() {
        const todolistId = '5d1f218d-f44c-4490-801e-152f047f28d0'
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: 'Putin'}, settings)
    }
}