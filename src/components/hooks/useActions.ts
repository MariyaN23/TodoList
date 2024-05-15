import {useMemo} from 'react';
import {ActionCreatorsMapObject, bindActionCreators} from 'redux';
import {useAppDispatch} from '../../app/store';

export function useActions<T extends ActionCreatorsMapObject>(actions: T) {
    const dispatch = useAppDispatch()
    const boundActions = useMemo(()=> {
        return bindActionCreators(actions, dispatch)
    }, [])
    return boundActions
}