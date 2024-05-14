import {instance, ResponseType} from './todolists-api';

export const TaskStatuses = {
    New: 0,
    InProgress: 1,
    Completed: 2,
    Draft: 3
} as const

export type TaskStatusesType = (typeof TaskStatuses)[keyof typeof TaskStatuses]

export const TaskPriorities = {
    Low: 0,
    Middle: 1,
    Hi: 2,
    Urgently: 3,
    Later: 4
} as const

export type TaskPrioritiesType = (typeof TaskPriorities)[keyof typeof TaskPriorities]

export type TaskType = {
    description: string
    title: string
    status: TaskStatusesType
    priority: TaskPrioritiesType
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type ResponseTasksType = {
    items: TaskType[]
    totalCount: number
    error: null | string
}

export type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

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