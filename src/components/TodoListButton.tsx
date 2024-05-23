import React from 'react';
import Button from '@mui/material/Button';

type ButtonPropsType = {
    name: string
    callBack: ()=>void
    className?: string
    style?: React.CSSProperties
    variant?: "text" | "contained" | "outlined" | undefined
    disabled?: boolean
}

export const TodoListButton: React.FC<ButtonPropsType> = React.memo(({disabled = false, ...props}) => {

    const onClickButtonHandler = () => {
        props.callBack()
    }

    return (
        <Button variant={props.variant ? props.variant : "outlined"}
                className={props.className}
                style={props.style}
                onClick={onClickButtonHandler}
                color={'secondary'}
                disabled={disabled}
        >{props.name}
        </Button>
    )
});