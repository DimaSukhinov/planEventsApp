import {combineReducers, createStore} from 'redux'
import {TypedUseSelectorHook, useSelector} from 'react-redux'
import {eventsReducer} from './events-reducer'
import {usersReducer} from './users-reducer'
import {giftsReducer} from './gifts-reducer'
import {locationsReducer} from './location-reducer'
import {purchaseItemsReducer} from './purchaseItem-reducer'
import {contributorsReducer} from './contributors-reducer'

const rootReducer = combineReducers({
    events: eventsReducer,
    users: usersReducer,
    gifts: giftsReducer,
    locations: locationsReducer,
    purchaseItems: purchaseItemsReducer,
    contributors: contributorsReducer,
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store