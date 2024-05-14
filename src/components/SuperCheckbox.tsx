import React, {ChangeEvent} from 'react';
import Checkbox from '@mui/material/Checkbox';
import {TaskStatuses, TaskStatusesType} from '../api/tasks-api';

type SuperCheckboxType = {
    status: TaskStatusesType
    callback: (checked: boolean)=> void
}

export const SuperCheckbox: React.FC<SuperCheckboxType> = React.memo((props) => {
    const changeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>)=> {
        props.callback(e.currentTarget.checked)
    }
    return (
            <Checkbox checked={props.status===TaskStatuses.Completed}
                      onChange={changeIsDoneHandler}
                      color="secondary"/>
    );
});