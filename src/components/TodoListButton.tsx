import React from 'react';
import Button from '@mui/material/Button';

type StyleType = {
    maxWidth: string
    maxHeight: string
    minWidth: string
    minHeight: string
}

type ButtonPropsType = {
    name: string
    callBack: ()=>void
    className?: string
    style?: StyleType
    variant?: "text" | "contained" | "outlined" | undefined
}

export const TodoListButton: React.FC<ButtonPropsType> = React.memo((props) => {

    const onClickButtonHandler = () => {
        props.callBack()
    }

    return (
        <Button variant={props.variant ? props.variant : "outlined"}
                className={props.className}
                style={props.style}
                onClick={onClickButtonHandler}
                color={'secondary'}>{props.name}</Button>

    )
});