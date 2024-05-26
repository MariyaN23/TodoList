//auth api
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export type AuthMeDataType = {
    id: string
    email: string
    login: string
}

//tasks api
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

//todolists api
export type TodolistsType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type FieldErrorType = {
    field: string
    error: string
}
export type ResponseType<D = {}> = {
    data: D
    messages: string[]
    fieldsErrors: Array<FieldErrorType>
    resultCode: number
}