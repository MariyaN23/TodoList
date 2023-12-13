import {AddItemForm} from './AddItemForm';
import {action} from '@storybook/addon-actions'
import React from 'react';

export default {
    title: 'Add item form',
    component: AddItemForm
}

const callBack = action("Button 'add' was pressed inside the form")

export const AddItemFormBaseExample = ()=> {
    return <AddItemForm callBack={callBack}/>
}