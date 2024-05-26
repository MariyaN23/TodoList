import {instance} from './todolists-api';
import {ResponseTasksType, ResponseType, TaskType, UpdateTaskType} from './types';

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<ResponseTasksType>(`todo-lists/${todolistId}/tasks`)
    },
    createTasks(todolistId: string, title: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTasks(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTasks(todolistId: string, taskId: string, newTask: UpdateTaskType) {
        return instance.put<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, newTask)
    }
}