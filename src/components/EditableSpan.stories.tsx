import {action} from '@storybook/addon-actions'
import React from 'react';
import {EditableSpan} from './EditableSpan';

export default {
    title: 'Edit span',
    component: EditableSpan
}

const titleCallBack = action("Title changed")

export const EditableSpanBaseExample = ()=> {
    return <EditableSpan title={'Task 1'} callback={titleCallBack}/>
}