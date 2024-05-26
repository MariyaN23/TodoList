import * as loginSelectors from './login-selectors'
import {Login} from './Login'
import * as loginActions from  './LoginActions'
import {slice} from "./LoginReducer"

const loginReducer = slice.reducer

export {
    loginSelectors,
    Login,
    loginActions,
    loginReducer
}