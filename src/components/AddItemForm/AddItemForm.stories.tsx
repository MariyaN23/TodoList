import {action} from '@storybook/addon-actions'
import React from 'react';
import {AddItemForm} from './AddItemForm';

export default {
    title: 'Add item form',
}

const asyncCallBack = async (...params: any[])=> {
    action("Button 'add' was pressed inside the form")(...params)
}

export const AddItemFormBaseExample = ()=> {
    return <AddItemForm callBack={asyncCallBack}/>
}

export const AddItemFormDisabledExample = ()=> {
    return <AddItemForm callBack={asyncCallBack} disabled={true}/>
}
