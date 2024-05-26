import * as appSelectors from './app-selectors'
import * as appAsyncActions from './AppActions'
import {slice} from './app-reducer';

const appActions = {...appAsyncActions, ...slice.actions}

const appReducer = slice.reducer

export {
    appSelectors,
    appActions,
    appReducer
}