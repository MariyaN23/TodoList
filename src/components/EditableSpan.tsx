import React, {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
    title: string
    callback: (newTitle: string) => void
    disabled?: boolean
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(({disabled, ...props}) => {
    console.log('EditableSpan')
    const [edit, setEdit] = useState(()=>false)
    const [inputValue, setInputValue] = useState(props.title)

    const onHandler = ()=> {
        if (disabled) return
        setEdit((prev)=>!prev)
        if (edit) {
            props.callback(inputValue)
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)

    return (edit
        ? <TextField id="standard-basic" variant="standard" color="secondary" value={inputValue} onBlur={onHandler} onChange={onChangeHandler} autoFocus/>
        : <span style={{wordBreak: "break-all"}} onDoubleClick={onHandler}>{props.title} </span>);
});