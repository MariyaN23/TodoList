import React from 'react';
import App from './App';
import {ReduxStoreProviderDecorator} from '../stories/ReduxStoreProviderDecorator';
import {MemoryRouter} from 'react-router-dom';

export default {
    title: 'App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppExample = ()=> {
    return <MemoryRouter>
        <App />
    </MemoryRouter>
}