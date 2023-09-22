import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from '../Todolist.module.css';
import {Button} from './Button';

type AddItemFormPropsType = {
    callBack: (title: string)=>void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [newTitle, setNewTitle] = useState('')

    const [error, setError] = useState<string | null>(null)

    const addTaskHandler =()=> {
        if (newTitle.trim() !== '') {
            props.callBack(newTitle.trim())
            setNewTitle('')
        } else {
            setError("Title is required")
        }
    }

    const onKeyDownHandler =(e: KeyboardEvent<HTMLInputElement>)=>{
        if (e.key === "Enter") {
            addTaskHandler()
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
        setError(null)
        setNewTitle(e.currentTarget.value)
    }

    return (
        <div>
            <input className={error ? s.error : ''}
                   value={newTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
            />
            <Button name={"+"} callBack={addTaskHandler}/>
            {error && <div className={error ? s.errorMessage : s.errorMessageNo}>{error}</div>}
        </div>
    );
};