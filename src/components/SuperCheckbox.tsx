import React, {ChangeEvent} from 'react';
import Checkbox from '@mui/material/Checkbox';

type SuperCheckboxType = {
    isDone: boolean
    callback: (checked: boolean)=> void
}

export const SuperCheckbox = React.memo((props: SuperCheckboxType) => {
    const changeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>)=> {
        props.callback(e.currentTarget.checked)
    }

    return (
            <Checkbox checked={props.isDone}
                      onChange={changeIsDoneHandler}
                      color="secondary"/>
    );
});