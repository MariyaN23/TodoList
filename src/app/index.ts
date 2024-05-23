import * as appSelectors from './app-selectors'
import * as appAsyncActions from './AppActions'
import {slice} from './app-reducer';


const appActions = {...appAsyncActions, ...slice.actions}
export {
    appSelectors,
    appActions
}