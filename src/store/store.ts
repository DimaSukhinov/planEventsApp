import {combineReducers, createStore} from 'redux'
import {TypedUseSelectorHook, useSelector} from 'react-redux'
import {eventsReducer} from './events-reducer'
import {usersReducer} from './users-reducer'
import {giftsReducer} from './gifts-reducer'
import {purchaseItemsReducer} from './purchaseItem-reducer'
import {locationsReducer} from './locations-reducer'
import {invitesReducer} from './invites-reducer'
import {acceptedInvitesReducer} from './acceptedInvites-reducer'
import {authReducer} from './auth-reducer'

const rootReducer = combineReducers({
    events: eventsReducer,
    users: usersReducer,
    gifts: giftsReducer,
    locations: locationsReducer,
    purchaseItems: purchaseItemsReducer,
    invites: invitesReducer,
    acceptedInvites: acceptedInvitesReducer,
    auth: authReducer,
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store
