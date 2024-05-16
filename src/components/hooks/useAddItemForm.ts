import {ChangeEvent, KeyboardEvent, useState} from 'react';

export function useAddItemForm(callBack: (params: {title: string})=>void) {
    const [newTitle, setNewTitle] = useState('')

    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            callBack({title: newTitle.trim()})
            if (newTitle.length <= 100) {
                setNewTitle('')
            }
        } else {
            setError('Title is required')
        }
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        setNewTitle(e.currentTarget.value)
    }

    return {
        error,
        newTitle,
        onChangeHandler,
        onKeyDownHandler,
        addTaskHandler
    }
}