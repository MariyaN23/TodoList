import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TodoListButton} from './TodoListButton';
import TextField from '@mui/material/TextField';

type AddItemFormPropsType = {
    callBack: (title: string)=>void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm is called')
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
        if (error !== null) {
            setError(null)
        }
        setNewTitle(e.currentTarget.value)
    }

    return (
        <div>
            <TextField id="outlined-basic"
                       label={error ? error : "Type something"}
                       variant="outlined"
                       size="small"
                       color="secondary"
                       error={!!error}
                       value={newTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}/>
            <TodoListButton name={"+"}
                            style={{maxWidth: "38px",
                                maxHeight: "38px",
                                minWidth: "38px",
                                minHeight: "38px"}}
                            variant={"contained"}
                            callBack={addTaskHandler}/>
        </div>
    );
})