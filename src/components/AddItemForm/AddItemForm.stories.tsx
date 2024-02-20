import {action} from '@storybook/addon-actions'
import React from 'react';
import {AddItemForm} from './AddItemForm';

export default {
    title: 'Add item form',
}

const callBack = action("Button 'add' was pressed inside the form")

export const AddItemFormBaseExample = ()=> {
    return <AddItemForm callBack={callBack}/>
}

export const AddItemFormDisabledExample = ()=> {
    return <AddItemForm callBack={callBack} disabled={true}/>
}