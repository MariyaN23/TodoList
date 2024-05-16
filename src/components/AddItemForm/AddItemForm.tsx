import React from 'react';
import {TodoListButton} from '../TodoListButton';
import TextField from '@mui/material/TextField';
import {useAddItemForm} from '../hooks/useAddItemForm';

type AddItemFormPropsType = {
    callBack: (params: {title: string})=>void
    disabled?: boolean
}

export const AddItemForm = React.memo(({disabled = false, ...props}: AddItemFormPropsType) => {
    console.log('AddItemForm is called')
    const {error,
        newTitle,
        onChangeHandler,
        onKeyDownHandler,
        addTaskHandler} = useAddItemForm(props.callBack)
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
                       onKeyDown={onKeyDownHandler}
                       disabled={disabled}/>
            <TodoListButton name={"+"}
                            style={{maxWidth: "38px",
                                maxHeight: "38px",
                                minWidth: "38px",
                                minHeight: "38px"}}
                            variant={"contained"}
                            callBack={addTaskHandler}
                            disabled={disabled}/>
        </div>
    );
})